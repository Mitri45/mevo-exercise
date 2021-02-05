import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function Navbar(props) {
  const { clickHandler } = props;

  return (
    <nav className='bg-mevo-main flex justify-between'>
      <img
        className='w-auto h-10 flex-grow-0 flex-shrink-0'
        src='https://assets.mevo.co.nz/brand/logo-light.svg'
        alt='Mevo Logo'
      />
      <Button text='Back to Welly' clickHandler={clickHandler} />
    </nav>
  );
}

Navbar.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
