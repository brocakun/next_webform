/// <reference types="react" />
import { WebformProps } from './types';
export declare class WebformError extends Error {
    response: string;
    constructor(response: string);
}
/**
 * Errors returned by Drupal.
 */
export type WebformErrors = {
    [name: string]: string;
};
export declare const Webform: ({ data: webformObject, id, customComponents, onSubmit: customOnSubmit, apiUrl, validate, ...formProps }: WebformProps) => JSX.Element;
