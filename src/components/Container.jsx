import React from 'react';
import PropTypes from 'prop-types';

export default function Container({ children }) {
  return <div className='h-screen flex flex-col font-body'>{children}</div>;
}

Container.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};
