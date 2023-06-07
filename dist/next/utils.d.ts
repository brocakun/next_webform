import { DrupalClient, FetchOptions } from 'next-drupal';
import { WebformObject } from '../types';
export declare const normalizeElements: (result: any) => any;
export declare function resolveWebformContent(id: string, drupal: DrupalClient, fetchOptions?: FetchOptions): Promise<WebformObject>;
export declare function resolveWebformSubmission(id: string, uuid: string, drupal: DrupalClient, fetchOptions?: FetchOptions): Promise<WebformObject>;
export declare function defaultOnSubmit({ id, event, data, setData, setStatus, setErrors, apiUrl, }: {
    id: any;
    event: any;
    data: any;
    setData: any;
    setStatus: any;
    setErrors: any;
    apiUrl: any;
}): Promise<void>;
