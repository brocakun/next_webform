import * as React from 'react';
import { useState } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const WebformRating = ({ element, value = 0, setValue, fieldProps }) => {
  const [hover, setHover] = useState(0);
  const max = element['#max'] ? element['#max'] : 5;
  const css = `
button {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
}
.on {
  color: rgb(14 165 233);
  }
.off {
color: #ccc;
}
.star-rating {
font-size: 2rem;
}
}`;
  return (
    <>
      <div className="star-rating">
        <input
          defaultValue={value}
          name={element['#webform_key']}
          hidden
          type="range"
          {...fieldProps}
          id={element['#webform_key']}
        />
        <style suppressHydrationWarning>{css}</style>
        {Array(max)
          .fill(0)
          .map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={index <= (hover || value) ? 'on' : 'off'}
                onClick={() => setValue(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(value)}
                disabled={element['#disabled']}
                hidden={!element['#access']}
              >
                <span className="star">&#9733;</span>
              </button>
            );
          })}
      </div>
    </>
  );
};

export default withStates(withDefaultValue(withWrapper(WebformRating)));
