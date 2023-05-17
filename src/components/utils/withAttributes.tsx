import * as React from 'react';
import classNames from 'classnames';
import { cssStringToObject, reactPropertyMap } from '../../utils';

export const normalizeAttributes = (attributes): { [key: string]: never } => {
  const ignoreList = [
    'id',
    'data-drupal-selector',
    'webform-remove-for-attribute',
  ];
  const filteredAttributes = Object.keys(attributes).filter((attribute) => {
    return !ignoreList.includes(attribute);
  });

  return filteredAttributes.reduce((currentValue, attribute) => {
    if (attribute === 'class') {
      currentValue['className'] = classNames(attributes[attribute]);
    } else if (reactPropertyMap[attribute]) {
      currentValue[reactPropertyMap[attribute]] = attributes[attribute];
    } else {
      currentValue[attribute] = attributes[attribute];
    }

    return currentValue;
  }, {});
};

const withAttributes = (EnhancedComponent) => {
  return function WebformElementWithAttributes(props) {
    const normalizedFieldAttributes = normalizeAttributes(
      props.element['#attributes'] ?? {},
    );
    const field = {
      ...normalizedFieldAttributes,
      ...(props.fieldProps ?? {}),
    };
    if (field['style']) {
      field['style'] = cssStringToObject(field['style']);
    }

    const normalizedLabelAttributes = normalizeAttributes(
      props.element['#label_attributes'] ?? {},
    );
    const label = {
      ...normalizedLabelAttributes,
      ...(props.labelProps ?? {}),
    };
    if (label['style']) {
      label['style'] = cssStringToObject(label['style']);
    }

    const normalizedWrapperAttributes = normalizeAttributes(
      props.element['#wrapper_attributes'] ?? {},
    );
    const wrapper = {
      ...normalizedWrapperAttributes,
      ...(props.wrapperProps ?? {}),
    };
    if (wrapper['style']) {
      wrapper['style'] = cssStringToObject(wrapper['style']);
    }

    return (
      <EnhancedComponent
        {...props}
        fieldProps={field}
        labelProps={label}
        wrapperProps={wrapper}
      />
    );
  };
};

export default withAttributes;
