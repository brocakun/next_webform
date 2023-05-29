import * as React from 'react';
import { PropsType, WebformElementProps } from '../types';
import { useEffect } from 'react';
import withStates from './utils/withStates';
import {
  getChildElements,
  isIterable,
  resolvePath,
  updateNameAndIdWithIndex,
} from '../utils';
import WebformElement from '../WebformElement';
import withAttributes from './utils/withAttributes';
import withWrapper from './utils/withWrapper';

export interface WebformMultifieldProps extends WebformElementProps {
  tableProps?: PropsType;
  trProps?: PropsType;
  tdProps?: PropsType;
}

const WebformMultifield = ({
  element,
  value,
  setValue,
  error,
  tableProps = {},
  trProps = {},
  tdProps = {},
}: WebformMultifieldProps) => {
  const normalizedValue = Array.isArray(value) ? value : [];
  const isCustomComposite = element['#type'] === 'webform_custom_composite';

  const remove = (item) => {
    if (!isIterable(value)) {
      throw new TypeError(`"${typeof value}" is not iterable`);
    }
    const newValue = [...value];
    newValue.splice(item, 1);
    setValue(newValue);
  };

  const renderChildElement = (item, childElement, childKey = null) => {
    const parents = [...element['#parents'], 'items', item, '_item_'];
    const currentElement = element.items[item]
      ? {
          ...childElement,
          '#access': element['#access'],
          '#states': element['#_webform_states'],
          '#parents': parents,
        }
      : {
          ...childElement,
          '#default_value': undefined,
          '#access': element['#access'],
          '#states': element['#_webform_states'],
          '#parents': parents,
        };
    return (
      <WebformElement
        key={currentElement['#id']}
        element={currentElement}
        setValue={(newChildValue: string) => {
          const newValue = Array.from(normalizedValue);
          if (childKey) {
            newValue[item][childKey] = newChildValue;
          } else {
            newValue[item] = newChildValue;
          }
          setValue(newValue);
        }}
        value={
          childKey ? normalizedValue[item][childKey] : normalizedValue[item]
        }
        error={error ? error[item] : null}
      />
    );
  };

  const renderChildren = (item) => {
    const compositeElements = getChildElements(element['#element']);
    const index = element.items[item] ? item : 0;
    if (Array.isArray(compositeElements) && compositeElements.length) {
      return compositeElements.map((childKey) => {
        // If 'Display in table columns' is unchecked in Drupal then the elements are
        // under the '_items_' key.
        const resolvedElement = element.items[index]['_item_']
          ? resolvePath(`items.${index}._item_.${childKey}`, element)
          : resolvePath(`items.${index}.${childKey}`, element);
        const currentElement = {
          ...resolvedElement,
          '#webform_key': childKey,
          '#id': `${resolvedElement['#id']}[${item}]`,
        };
        const elementItem = JSON.parse(JSON.stringify(currentElement));
        updateNameAndIdWithIndex(item, elementItem);
        return renderChildElement(item, elementItem, childKey);
      });
    } else {
      const childElement = {
        ...element.items[index]['_item_'],
        '#webform_key': `${element.items[index]['_item_']['#webform_key']}[${item}]`,
        '#id': `${element.items[index]['_item_']['#webform_key']}[${item}]`,
      };
      return renderChildElement(item, childElement);
    }
  };

  const maxItems = element['#cardinality'];
  const currentCount = normalizedValue.length;

  useEffect(() => {
    if (currentCount === 0) {
      // Multifield is responsible for setting the default value to the state
      // when the default value is an array. If the value is something else than
      // array, it is the responsibility of the child element to ensure that the
      // element data is initialized with the correct default value.
      if (
        element['#default_value'] &&
        Array.isArray(element['#default_value'])
      ) {
        setValue(element['#default_value']);
      } else {
        setValue(['']);
      }
    }
  }, []);

  const children = [];
  for (let i = 0; i < currentCount; i++) {
    const removeButton = {
      ...element.items[0]['_operations_']['remove'],
      '#type': 'button',
      '#value': 'Remove',
    };
    children.push(
      <tr key={i} {...trProps}>
        <td {...tdProps}>{renderChildren(i)}</td>
        <td {...tdProps}>
          <WebformElement
            element={removeButton}
            fieldProps={{
              onClick: (e) => {
                e.preventDefault();
                remove(i);
              },
              id: `${element['#webform_key']}-remove-btn-${i}`,
              className: `remove-btn`,
            }}
          />
        </td>
      </tr>,
    );
  }
  return (
    <>
      <table
        style={{
          width: '100%',
        }}
        {...tableProps}
      >
        <tbody>{children}</tbody>
      </table>
      {(currentCount < maxItems || !maxItems) && (
        <div>
          <WebformElement
            element={{
              ...element['add']['submit'],
              '#type': 'button',
            }}
            fieldProps={{
              onClick: (e) => {
                e.preventDefault();
                normalizedValue.push(isCustomComposite ? {} : '');
                setValue(normalizedValue);
              },
              id: `${element['#webform_key']}-add-btn`,
              className: `add-btn`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default withStates(
  withAttributes(withWrapper(WebformMultifield, { labelFor: false })),
);
