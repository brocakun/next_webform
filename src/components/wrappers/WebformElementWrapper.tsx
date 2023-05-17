import * as React from 'react';
import { WebformWrapperProps } from '../../types';
import classNames from 'classnames';

const WebformElementWrapper = ({
  children,
  label,
  labelProps = {},
  labelFor,
  isRequired,
  description,
  descriptionDisplay,
  descriptionProps = {},
  labelDisplay = 'before',
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
    'visually-hidden': labelDisplay === 'invisible',
  });

  const descriptionClasses = classNames(descriptionProps['className'], {
    'visually-hidden': descriptionDisplay === 'invisible',
  });

  const labelElement = (
    <label {...labelProps} className={labelClasses} htmlFor={labelFor}>
      {label}
    </label>
  );
  return access ? (
    <div {...props}>
      <style suppressHydrationWarning>{css}</style>
      {!['after', 'none'].includes(labelDisplay) && labelElement}
      {descriptionDisplay === 'before' && description && (
        <div {...descriptionProps}>{description}</div>
      )}
      {children}
      {(descriptionDisplay === 'after' || descriptionDisplay === 'invisible') &&
        description && (
          <div {...descriptionProps} className={descriptionClasses}>
            {description}
          </div>
        )}
      {labelDisplay === 'after' && labelElement}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  ) : null;
};

export default WebformElementWrapper;
