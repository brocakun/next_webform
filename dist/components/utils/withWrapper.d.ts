/// <reference types="react" />
import { WebformElementType } from '../../types';
export type customConfigFn = (element: WebformElementType) => object;
declare const withWrapper: (EnhancedComponent: any, customConfig?: object | customConfigFn) => (props: any) => JSX.Element;
export default withWrapper;
