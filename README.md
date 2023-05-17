# Next.js Drupal Webform

Framework for integrating the [Webform](https://www.drupal.org/project/webform)
module with Next.js applications. This library is capable of rendering simple
Webforms out-of-the-box. The functionality can be extended to support advanced
features of Webform.

## Setup

1. Install the [Webform](https://www.drupal.org/project/webform)
   and [Webform REST](https://www.drupal.org/project/webform_rest) modules.
2. Apply [patch from this issue](https://www.drupal.org/project/webform_rest/issues/3317762) on Webform REST to add Webform Autocomplete Options endpoint (not needed if you are not using autocomplete fields)
3. Enable REST resources: "Webform Submit", "Webform Elements", "Webform Autocomplete Options", "Webform Submission" on `/admin/config/services/rest`.
4. Set permissions `/admin/people/permissions#module-rest` for RESTful Web Services. Note: you may want to use an authorized client instead of exposing the Webform data for anonymous users.
5. Create a new webform if you have not already `/admin/structure/webform`.
6. Render Webform in your Next.js application using this framework. Example Next.js implementation can be found [here](https://github.com/lauriii/next-acms-webform).

## Example

```
const drupal = new DrupalClient('http://localhost');
const webform = await resolveWebformContent(
 'contact', // Webform ID
 drupal,
);
```

```
<Webform id={webform.id} data={webform} />
```

## Using custom components

1. Create your custom component

```
// Example custom component
export const WebformDate = ({ element, error }) => {
  return (
    <WebformElementWrapper
      labelFor={element['#title']}
      isRequired={element['#required']}
      settings={null}
      error={error}
    >
      <input
        type="date"
        name={element['#webform_key']}
        min="2022-01-01"
        max="2022-12-31"
      />
    </WebformElementWrapper>
  );
};
```

2. Pass in your component(s) to the `customComponents` property. The key in
   `customComponents` is used for resolving the custom Webform element on the
   correct type. This can be either an override of type that is supported by
   default, or a type which is not supported out-of-the-box.

```
<Webform
   id={webform.id}
   data={webform}
   customComponents={{
      date: WebformDate,
   }}
/>
```
