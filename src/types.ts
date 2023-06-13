import * as React from 'react';
import ComponentRegistry from './ComponentRegistry';
import { HTMLProps } from 'react';

export type WebformElementProps = {
  element: WebformElementType;
  error?: string | React.ReactNode | ErrorObjectType;
  value?: string | boolean | Array<string | WebformDataType> | WebformDataType;
  setValue?: (
    value:
      | string
      | boolean
      | Array<string | WebformDataType>
      | WebformDataType
      | HTMLInputElement,
  ) => void;
  fieldProps?: PropsType;
  labelProps?: PropsType;
  wrapperProps?: PropsType;

  [key: string | number | symbol]: unknown;
};

export type PropsType = {
  [key: string]: string | Array<string> | object | boolean;
};

export type ErrorObjectType = {
  [key: string]: string | ErrorObjectType;
};

export type removeFn = (i?: number) => void;
export type renderChildElementFn = (item: number) => React.ReactNode;

/**
 * Custom component for webform element
 */
export type WebformCustomComponent = React.FC<WebformElementProps>;

type onSubmitProps = {
  event;
  data;
  setData: setDataFn;
  setStatus;
  setErrors;
  id: string;
  sid: string;
  apiUrl: string;
};
export type onSubmitFn = (props: onSubmitProps) => void;

export type ComponentLibrary = {
  [name: string]: WebformCustomComponent;
};

export type WebformProps = HTMLProps<HTMLFormElement> & {
  id: string;
  sid?: string;
  data: WebformObject;
  customComponents?: ComponentLibrary;
  onSubmit?: onSubmitFn;
  validate?: validateFn;
  apiUrl?: string;
};

export type validateFn = (
  data: WebformDataType,
) => ErrorObjectType | Promise<ErrorObjectType> | null;
export type validateFieldFn = (value: string) => string | null;

export type WebformObject = {
  id: string;
  sid?: string;
  title: string;
  description?: string;
  status: string;
  elements: WebformElementType[];
  confirmation: {
    type: string;
    url?: string;
    message?: string;
  };
};

export type WebformElementType = {
  '#title': string;
  '#type': string;
  '#autocomplete_items'?: string;
  '#webform_key': string;
  '#submit__label'?: string;
  '#options'?: object;
  '#description': string;
  '#required'?: boolean;
  '#parents': Array<string>;
  items?: object;
  '#id'?: string;
};

export type WebformContextType = FieldRegistration & {
  apiUrl: string;
  id: string;
  sid?: string;
  data: WebformDataType;
  setData: setDataFn;
  setStatus: setStatusFn;
  errors: ErrorObjectType;
  registry?: ComponentRegistry;
};

export type WebformWrapperProps = {
  style?: object;
  labelProps?: PropsType;
  labelFor?: string;
  description?: string | React.ReactNode;
  descriptionDisplay?: string;
  descriptionProps?: { [key: string]: string | Array<string> };
  isRequired: boolean;
  labelDisplay?: string;
  label?: string;
  settings?: string;
  children: object;
  error?: string | React.ReactNode | ErrorObjectType;
  access: boolean;
};

export type setDataFn = (
  fn: React.Dispatch<React.SetStateAction<WebformDataType>>,
) => void;

export type setStatusFn = React.Dispatch<React.SetStateAction<StatusType>>;

export type WebformDataType = {
  [key: string]:
    | string
    | WebformDataType
    | Array<string | WebformDataType>
    | null;
};

export type StatusType = 'error' | 'success' | undefined;

export type validatorFn = (
  i: string | WebformDataType | (string | WebformDataType)[],
) => boolean;

export interface FieldRegistry {
  [field: string]: {
    validate: (value: any) => string | Promise<string> | undefined;
  };
}

export interface FieldRegistration {
  registerField: (name: string, fns: { validate?: validateFieldFn }) => void;
  unregisterField: (name: string) => void;
}
