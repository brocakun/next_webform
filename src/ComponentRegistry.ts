import * as React from 'react';
import { WebformElementProps } from './types';

class ComponentRegistry {
  private _registry: Map<string, React.FC<WebformElementProps | any>>;

  constructor(registry = {}) {
    this._registry = new Map();
    Object.keys(registry).forEach((key) => {
      this._registry.set(key, registry[key]);
    });
  }

  // get a component by id, if not available we return null
  getComponent = (key: string) => {
    return this._registry.get(key) ?? null;
  };

  setComponent = (key: string, component: React.FC<WebformElementProps>) => {
    this._registry.set(key, component);
  };
}

export default ComponentRegistry;
