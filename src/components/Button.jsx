import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { clickHandler, text } = props;
  return (
    <button
      type='button'
      className='inline-block px-6 py-2 text-base font-medium leading-6 text-center text-white uppercase transition shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none'
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
