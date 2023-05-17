/// <reference types="react" />
import { PropsType } from '../types';
import { WebformTableRowProps } from './WebformTableRow';
export interface WebformTableProps extends WebformTableRowProps {
    theadProps?: PropsType;
    tbodyProps?: PropsType;
    trProps?: PropsType;
}
declare const _default: (props: import("../types").WebformElementProps) => JSX.Element;
export default _default;
