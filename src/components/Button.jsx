import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { clickHandler, text, locationEnabled } = props;
  const [isShown, setIsShown] = useState(false);

  const buttonClasses = `${
    locationEnabled ? 'cursor-pointer' : 'cursor-not-allowed'
  } relative inline-block px-6 py-2 text-base font-medium leading-6 text-center text-white uppercase transition shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none`;

  return (
    <div
      onMouseEnter={() => setIsShown(!isShown)}
      onMouseLeave={() => setIsShown(!isShown)}
    >
      <button
        type='button'
        className={buttonClasses}
        onClick={clickHandler}
        disabled={!locationEnabled}
      >
        {text}
      </button>
      {!locationEnabled && isShown && (
        <span className='bg-yellow-300 border-r border-opacity-50 border-yellow-600 rounded-md shadow-md text-white w-auto h-auto absolute top-10 right-20 z-10 p-2'>
          GeoLocation should be enabled
        </span>
      )}
    </div>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  locationEnabled: PropTypes.bool,
};

Button.defaultProps = { isDisabled: true, locationEnabled: false };
