/// <reference types="react" />
import ComponentRegistry from '../ComponentRegistry';
declare const defaultComponents: {
    textfield: (props: import("..").WebformElementProps) => JSX.Element;
    number: (props: import("..").WebformElementProps) => JSX.Element;
    hidden: (props: import("..").WebformElementProps) => JSX.Element;
    email: (props: import("..").WebformElementProps) => JSX.Element;
    search: (props: import("..").WebformElementProps) => JSX.Element;
    tel: (props: import("..").WebformElementProps) => JSX.Element;
    url: (props: import("..").WebformElementProps) => JSX.Element;
    textarea: (props: import("..").WebformElementProps) => JSX.Element;
    autocomplete: (props: import("..").WebformElementProps) => JSX.Element;
    checkbox: (props: import("..").WebformElementProps) => JSX.Element;
    checkboxes: (props: import("..").WebformElementProps) => JSX.Element;
    entity_autocomplete: (props: import("..").WebformElementProps) => JSX.Element;
    range: (props: import("..").WebformElementProps) => JSX.Element;
    radio: (props: import("..").WebformElementProps) => JSX.Element;
    radios: (props: import("..").WebformElementProps) => JSX.Element;
    select: (props: import("..").WebformElementProps) => JSX.Element;
    webform_autocomplete: (props: import("..").WebformElementProps) => JSX.Element;
    webform_checkboxes_other: (props: import("..").WebformElementProps) => JSX.Element;
    webform_entity_checkboxes: (props: import("..").WebformElementProps) => JSX.Element;
    webform_entity_radios: (props: import("..").WebformElementProps) => JSX.Element;
    webform_radios_other: (props: import("..").WebformElementProps) => JSX.Element;
    webform_rating: (props: import("..").WebformElementProps) => JSX.Element;
    webform_select_other: (props: import("..").WebformElementProps) => JSX.Element;
    webform_terms_of_service: (props: import("..").WebformElementProps) => JSX.Element;
    container: (props: import("..").WebformElementProps) => JSX.Element;
    fieldset: (props: import("..").WebformElementProps) => JSX.Element;
    webform_flexbox: (props: import("..").WebformElementProps) => JSX.Element;
    webform_section: (props: import("..").WebformElementProps) => JSX.Element;
    webform_table: (props: import("..").WebformElementProps) => JSX.Element;
    webform_table_row: (props: any) => JSX.Element;
    webform_address: (props: any) => JSX.Element;
    webform_contact: (props: any) => JSX.Element;
    webform_name: (props: any) => JSX.Element;
    webform_link: (props: any) => JSX.Element;
    webform_custom_composite: ({ element, error, value, setValue, labelProps, }: {
        element: any;
        error: any;
        value: any;
        setValue: any;
        labelProps: any;
    }) => JSX.Element;
    date: (props: import("..").WebformElementProps) => JSX.Element;
    datelist: (props: import("..").WebformElementProps) => JSX.Element;
    datetime: (props: import("..").WebformElementProps) => JSX.Element;
    webform_time: (props: import("..").WebformElementProps) => JSX.Element;
    button: (props: any) => JSX.Element;
    submit: ({ element, wrapperProps }: {
        element: any;
        wrapperProps: any;
    }) => JSX.Element;
    item: (props: import("..").WebformElementProps) => JSX.Element;
    value: (props: import("..").WebformElementProps) => JSX.Element;
    webform_actions: ({ element, wrapperProps }: {
        element: any;
        wrapperProps: any;
    }) => JSX.Element;
    webform_email_confirm: (props: import("..").WebformElementProps) => JSX.Element;
    webform_multiple: (props: import("..").WebformElementProps) => JSX.Element;
    confirmation_page: ({ webform, submission }: {
        webform: any;
        submission: any;
    }) => JSX.Element;
    form_layout: ({ webform, status }: {
        webform: any;
        status: any;
    }) => JSX.Element;
    message: ({ children, type }: import("./Message").messagePropTypes) => JSX.Element;
    webform_wizard_page: (props: import("..").WebformElementProps) => JSX.Element;
    webform_message: (props: import("..").WebformElementProps) => JSX.Element;
    webform_markup: (props: import("..").WebformElementProps) => JSX.Element;
};
export declare const defaultComponentRegistry: ComponentRegistry;
export default defaultComponents;
