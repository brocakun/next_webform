import * as React from 'react';
import { WebformWrapperProps } from '../../types';
import classNames from 'classnames';

const WebformFieldsetWrapper = ({
  children,
  label,
  labelProps = {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  labelDisplay,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  labelFor,
  description,
  descriptionDisplay,
  descriptionProps = {},
  isRequired,
  error,
  access,
  ...props
}: WebformWrapperProps) => {
  const css = `
.required-field:after {
  content: ' *';
  color: red;
}
.invalid-feedback {
  color: red;
}
.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  overflow: hidden;
  height: 1px;
  width: 1px;
  word-wrap: normal;
}
        `;
  const labelClasses = classNames(labelProps['className'] as string, {
    'required-field': isRequired,
  });

  const descriptionClasses = classNames(descriptionProps['className'], {
    'visually-hidden': descriptionDisplay === 'invisible',
  });

  const labelElement = (
    <legend {...labelProps} className={labelClasses}>
      {label}
    </legend>
  );
  return access ? (
    <fieldset {...props}>
      <style suppressHydrationWarning>{css}</style>
      {labelElement}
      {descriptionDisplay === 'before' && description && (
        <div {...descriptionProps} className={descriptionClasses}>
          {description}
        </div>
      )}
      {children}
      {(descriptionDisplay === 'after' || descriptionDisplay === 'invisible') &&
        description && (
          <div {...descriptionProps} className={descriptionClasses}>
            {description}
          </div>
        )}
      {error && <div className="invalid-feedback">{error}</div>}
    </fieldset>
  ) : null;
};

export default WebformFieldsetWrapper;
