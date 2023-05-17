import * as React from 'react';
import { WebformElementProps } from './types';
declare class ComponentRegistry {
    private _registry;
    constructor(registry?: {});
    getComponent: (key: string) => React.FC<any>;
    setComponent: (key: string, component: React.FC<WebformElementProps>) => void;
}
export default ComponentRegistry;
