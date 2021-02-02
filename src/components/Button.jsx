import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
  const { onClick } = props;
  return (
    <button
      type='button'
      className='inline-block px-6 py-2 text-xs font-medium leading-6 text-center text-white uppercase transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none'
      onClick={onClick}
    >
      Primary
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
