import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className='h-screen flex flex-col'>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};
