import { DrupalClient, FetchOptions } from 'next-drupal';
import { WebformObject } from '../types';
import { getChildElements, getNormalizedErrorMessages } from '../utils';

const deleteKeys = [
  '#process',
  '#groups',
  '#after_build',
  '#pre_render',
  '#value_callback',
  '#theme_wrappers',
  '#allowed_tags',
  '#attached',
  '#element_validate',
  '#cache',
  '#prefix',
  '#suffix',
  '#webform_children',
  '#webform_parents',
  '#array_parents',
  '#autocomplete_route_parameters',
  '#autocomplete_route_name',
  '#ajax',
  '#ajax_processed',
  '#ajax_prefix',
  '#ajax_suffix',
  '#child_keys',
  '#ajax_attributes',
  '#tabledrag',
  '#sorted',
  '#processed',
  '#after_build_done',
  '#tree',
];
export const normalizeElements = (result) => {
  deleteKeys.forEach((key) => {
    delete result[key];
  });
  getChildElements(result).forEach(function (key) {
    result[key] = normalizeElements(result[key]);
  });

  return result;
};

export const updateNestedObjectDefaultValue = (obj, keyToFind, newValue) => {
  // Base case: if the object is not an actual object, return
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  // Iterate over the object's keys
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Check if the current key matches the key you want to find
      if (key === keyToFind) {
        // Update the value with the new value
        obj[key]['#default_value'] = newValue;
      }
      // If the current value is another object, recursively call the function
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        updateNestedObjectDefaultValue(obj[key], keyToFind, newValue);
      }
    }
  }
};

export async function resolveWebformContent(
  id: string,
  locale: '',
  drupal: DrupalClient,
  fetchOptions?: FetchOptions,
): Promise<WebformObject> {
  const url = drupal.buildUrl(`/webform/${id}?_format=json`);
  // Suport for Multilanguage context.
  const elementsUrl = drupal.buildUrl(
    `${
      locale !== '' ? `/${locale}` : ''
    }/webform_rest/${id}/elements?_format=json`,
  );
  const [result, elementsResult] = await Promise.all([
    drupal.fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    drupal.fetch(elementsUrl.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ]);
  if (!result.ok) {
    const message = await result.json();
    throw new Error(message);
  }
  if (!elementsResult.ok) {
    const message = await elementsResult.json();
    throw new Error(message);
  }

  // Clean up some commonly provided, unused properties to reduce the overall
  // size of props.
  const normalizedElements = normalizeElements(await elementsResult.json());

  const webform = await result.json();

  return {
    id: id,
    sid: id,
    title: webform.title,
    description: webform.description,
    status: webform.status,
    confirmation: {
      type: webform.settings.confirmation_type,
      url: webform.settings.confirmation_url,
      message: webform.settings.confirmation_message,
    },
    elements: normalizedElements,
  };
}

export async function resolveWebformSubmission(
  id: string,
  sid: string,
  locale = '',
  drupal: DrupalClient,
  fetchOptions?: FetchOptions,
): Promise<WebformObject> {
  const url = drupal.buildUrl(`/webform/${id}?_format=json`);
  // Suport for Multilanguage context.
  const elementsUrl = drupal.buildUrl(
    `${
      locale !== '' ? `/${locale}` : ''
    }/webform_rest/${id}/elements?_format=json`,
  );
  const submissionUrl = drupal.buildUrl(
    `/webform_rest/${id}/submission/${sid}?_format=json`,
  );
  const [result, elementsResult, submissionResult] = await Promise.all([
    drupal.fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    drupal.fetch(elementsUrl.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
    drupal.fetch(submissionUrl.toString(), {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  ]);
  if (!result.ok) {
    const message = await result.json();
    throw new Error(message);
  }
  if (!elementsResult.ok) {
    const message = await elementsResult.json();
    throw new Error(message);
  }
  if (!submissionResult.ok) {
    const message = await submissionResult.json();
    throw new Error(message);
  }

  // Clean up some commonly provided, unused properties to reduce the overall
  // size of props.
  const normalizedElements = normalizeElements(await elementsResult.json());
  // Fetch submission ID
  const submission = await submissionResult.json();
  const submissionData = submission.data;
  // Fill values with default data from submission.
  for (const [key, value] of Object.entries(submissionData)) {
    updateNestedObjectDefaultValue(normalizedElements, key, value);
  }
  const webform = await result.json();

  return {
    id: id,
    sid: sid,
    title: webform.title,
    description: webform.description,
    status: webform.status,
    confirmation: {
      type: webform.settings.confirmation_type,
      url: webform.settings.confirmation_url,
      message: webform.settings.confirmation_message,
    },
    elements: normalizedElements,
  };
}

export async function defaultOnSubmit({
  id,
  sid,
  event,
  data,
  setData,
  setStatus,
  setErrors,
  apiUrl,
}) {
  const body = {
    ...(data as object),
    ...{ webform_id: id, submission_id: sid },
  };
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    setStatus('error');
    const message = await response.json();
    setErrors(getNormalizedErrorMessages(message.message.error));
  } else {
    setStatus('success');
    setData({});
    // Clear webform element errors.
    setErrors({});
  }
}
