import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { isObject, WebformContext } from '../../utils';
import { WebformDataType, WebformElementProps } from '../../types';

// Generate dependency array for useEffect.
const getDependencies = (
  states: WebformStatesRenderArrayType,
): Array<string> => {
  if (!states || Object.keys(states).includes('headers')) {
    return [];
  }

  const dependencies = [];
  for (const effect of Object.keys(states)) {
    // Loop through indexes or selectors.
    for (const indexOrSelector of Object.keys(states[effect])) {
      // If indexOrSelector is not an index, then ALL conditions must be true
      // for the attribute to take effect.
      if (isNaN(Number(indexOrSelector))) {
        const elementName = getElementName(indexOrSelector);
        dependencies.push(elementName);
      } else if (
        states[effect][indexOrSelector] !== 'or' &&
        states[effect][indexOrSelector] !== 'xor'
      ) {
        const selectorString = Object.keys(states[effect][indexOrSelector])[0];
        const elementName = getElementName(selectorString);
        dependencies.push(elementName);
      }
    }
  }
  return dependencies;
};

// Returns substring with the element selector.
function getElementName(string: string): string | undefined {
  const match = string.match(/\[name=["|']([A-z][A-z\d-_.:]*)["|']\]$/);
  return match && match[1];
}

// Checks if the condition is true or not and returns a boolean value.
function getConditionState(trigger, value: string | boolean): boolean {
  if (isObject(trigger[Object.keys(trigger)[0]])) {
    switch (Object.keys(trigger[Object.keys(trigger)[0]])[0]) {
      case 'pattern': {
        if (typeof value !== 'string') {
          return false;
        }

        const re = new RegExp(trigger['value']['pattern']);
        return re.test(value);
      }
      case '!pattern': {
        if (typeof value !== 'string') {
          return false;
        }

        const re = new RegExp(trigger['value']['pattern']);
        return !re.test(value);
      }
      case 'less':
        return value < trigger['value']['less'];
      case 'less_equal':
        return value <= trigger['value']['less_equal'];
      case 'greater':
        return value > trigger['value']['greater'];
      case 'greater_equal':
        return value >= trigger['value']['greater_equal'];
      case 'between':
      case '!between': {
        const betweenValues = trigger['value']['between'];
        const min = betweenValues.substring(0, betweenValues.indexOf(':'));
        const max = betweenValues.substring(
          betweenValues.indexOf(':'),
          betweenValues.length - 1,
        );
        if (Object.keys(trigger)[0] == 'between') {
          return value >= min && value <= max;
        } else {
          return value < min || value > max;
        }
      }
    }
  } else {
    switch (trigger && Object.keys(trigger)[0]) {
      case 'empty':
        return !value;
      case 'filled':
        return !!value;
      case 'checked':
        return value == true;
      case 'unchecked':
        return value == false;
      case 'value':
        return value == trigger['value'];
      case '!value':
        return value != trigger['value'];
    }
  }
}

const getStateConditions = (
  states: WebformStatesRenderArrayType,
  data: WebformDataType,
) => {
  const allConditionsForTrue = {};
  const anyConditionForTrue = {};
  const oneConditionForTrue = {};
  let webformStates;

  if (states && !Object.keys(states).includes('headers')) {
    webformStates = states;
    for (const effect of Object.keys(webformStates)) {
      allConditionsForTrue[effect] = {};
      anyConditionForTrue[effect] = {};
      oneConditionForTrue[effect] = {};
      // Loop through indexes or selectors.
      for (const indexOrSelector of Object.keys(webformStates[effect])) {
        // If indexOrSelector is not an index, then ALL conditions must be true
        // for the attribute to take effect.
        if (isNaN(Number(indexOrSelector))) {
          const elementName = getElementName(indexOrSelector);

          if (
            Object.prototype.hasOwnProperty.call(data, elementName) &&
            typeof data[elementName] !== 'string' &&
            typeof data[elementName] !== 'boolean'
          ) {
            console.warn(
              `Unexpected type "${typeof data[
                elementName
              ]}" for element "${elementName}"`,
            );
            continue;
          }

          allConditionsForTrue[effect][elementName] = getConditionState(
            webformStates[effect][indexOrSelector],
            (data[elementName] as string | boolean) ?? undefined,
          );
        } else if (
          webformStates[effect][indexOrSelector] !== 'or' &&
          webformStates[effect][indexOrSelector] !== 'xor'
        ) {
          const selectorString = Object.keys(
            webformStates[effect][indexOrSelector],
          )[0];
          const elementName = getElementName(selectorString);
          const trigger = Object.values(
            webformStates[effect][indexOrSelector],
          )[0];

          if (
            Object.prototype.hasOwnProperty.call(data, elementName) &&
            typeof data[elementName] !== 'string' &&
            typeof data[elementName] !== 'boolean'
          ) {
            console.warn(
              `Unexpected type "${typeof data[
                elementName
              ]}" for element "${elementName}"`,
            );
            continue;
          }

          if (Object.values(webformStates[effect]).includes('or')) {
            anyConditionForTrue[effect][elementName] = getConditionState(
              trigger,
              (data[elementName] as string | boolean) ?? undefined,
            );
          } else if (Object.values(webformStates[effect]).includes('xor')) {
            oneConditionForTrue[effect][elementName] = getConditionState(
              trigger,
              (data[elementName] as string | boolean) ?? undefined,
            );
          }
        }
      }
    }
  }
  return {
    allConditionsForTrue,
    anyConditionForTrue,
    oneConditionForTrue,
    webformStates,
  };
};

const getEffect = (
  effect: string,
): WebformElementStatesStateType | undefined => {
  switch (effect) {
    case 'invisible':
    case 'invisible-slide':
    case '!visible':
      return { '#access': false };
    case 'visible':
    case 'visible-slide':
    case '!invisible':
      return { '#access': true };
    case 'enabled':
    case '!disabled':
      return { '#disabled': false };
    case 'disabled':
    case '!enabled':
      return { '#disabled': true };
    case 'required':
    case '!optional':
      return { '#required': true };
    case 'optional':
    case '!required':
      return { '#required': false };
    case 'checked':
    case '!unchecked':
      return { '#checked': true };
    case 'unchecked':
    case '!checked':
      return { '#unchecked': true };
    case 'readonly':
    case '!readwrite':
      return { '#readonly': true };
    case 'readwrite':
    case '!readonly':
      return { '#readonly': false };
  }
};

const getStatesForData = (
  states: WebformStatesRenderArrayType,
  data: WebformDataType,
): WebformElementStatesStateType => {
  // Initialize the list of conditions and set whether they are true or not.
  const {
    allConditionsForTrue,
    anyConditionForTrue,
    oneConditionForTrue,
    webformStates,
  } = getStateConditions(states, data);

  if (
    !webformStates ||
    Object.keys(webformStates).length === 0 ||
    !Object.keys(webformStates)[0].length
  ) {
    return;
  }

  const effects = {};

  // Set the state accordingly based on our list of conditions.
  for (const effect of Object.keys(webformStates)) {
    // Check if EVERY condition is true.
    if (
      Object.keys(allConditionsForTrue[effect]).length &&
      Object.values(allConditionsForTrue[effect]).every(
        (value) => value === true,
      )
    ) {
      Object.assign(effects, getEffect(effect));
      // Check if ANY condition is true (OR).
    } else if (
      Object.keys(anyConditionForTrue[effect]).length &&
      Object.values(anyConditionForTrue[effect]).includes(true)
    ) {
      Object.assign(effects, getEffect(effect));
      // Check if ONE condition is true (XOR).
    } else if (Object.keys(oneConditionForTrue[effect]).length) {
      const filterByTrue = Object.values(oneConditionForTrue[effect]).filter(
        (item) => item == true,
      );
      if (filterByTrue.length == 1) {
        Object.assign(effects, getEffect(effect));
      } else {
        const falseEffect = '!' + effect;
        Object.assign(effects, getEffect(falseEffect));
      }
    } else {
      const falseEffect = '!' + effect;
      Object.assign(effects, getEffect(falseEffect));
    }
  }

  return effects;
};

type WebformElementStatesStateType = {
  '#access'?: boolean;
  '#disabled'?: boolean;
  '#required'?: boolean;
  '#checked'?: boolean;
  '#unchecked'?: boolean;
  '#readonly'?: boolean;
};

type WebformStatesRenderArrayType = {
  [effect: string]: WebformAndStateType | WebformOrStateType;
};

type WebformAndStateType = {
  [selector: string]: { [trigger: string]: boolean | string };
};

type WebformOrStateType = {
  [key: number]:
    | {
        [selector: string]: { [trigger: string]: boolean | string };
      }
    | 'or'
    | 'xor';
};

// Higher order component to handle the conditional logic for Webform elements.
const withStates = (WrappedComponent) => {
  return function WebformElementWithStates(props: WebformElementProps) {
    const [state, setState] = useState<WebformElementStatesStateType>({});
    const { data } = useContext(WebformContext);
    const { element } = props;
    // Multi-value elements don't have #states in its render array so we need to use #_webform_states.
    const elementStates = element['add']
      ? element['#_webform_states']
      : element['#states'];
    const dependencyElements = getDependencies(elementStates);

    useEffect(() => {
      setState(getStatesForData(elementStates, data));
    }, []);
    useEffect(
      () => {
        setState(getStatesForData(elementStates, data));
      },
      dependencyElements.map((key) => data[key]),
    );

    // Override element object with the dynamic states.
    return <WrappedComponent {...props} element={{ ...element, ...state }} />;
  };
};

export default withStates;
