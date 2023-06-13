import { DrupalClient, FetchOptions } from 'next-drupal';
import { WebformObject } from '../types';
export declare const normalizeElements: (result: any) => any;
export declare const updateNestedObjectDefaultValue: (obj: any, keyToFind: any, newValue: any) => void;
export declare function resolveWebformContent(id: string, drupal: DrupalClient, fetchOptions?: FetchOptions): Promise<WebformObject>;
export declare function resolveWebformSubmission(id: string, sid: string, drupal: DrupalClient, fetchOptions?: FetchOptions): Promise<WebformObject>;
export declare function defaultOnSubmit({ id, sid, event, data, setData, setStatus, setErrors, apiUrl, }: {
    id: any;
    sid: any;
    event: any;
    data: any;
    setData: any;
    setStatus: any;
    setErrors: any;
    apiUrl: any;
}): Promise<void>;
