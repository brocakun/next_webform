/// <reference types="react" />
import { PropsType, WebformElementProps } from '../types';
export interface WebformMultifieldProps extends WebformElementProps {
    tableProps?: PropsType;
    trProps?: PropsType;
    tdProps?: PropsType;
}
declare const _default: (props: WebformElementProps) => JSX.Element;
export default _default;
