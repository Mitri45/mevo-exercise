import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

export default function Navbar(props) {
  const { findNearestCar, locationEnabled } = props;

  return (
    <nav className='bg-mevo-main flex justify-between'>
      <img
        className='w-auto h-10 flex-grow-0 flex-shrink-0'
        src='https://assets.mevo.co.nz/brand/logo-light.svg'
        alt='Mevo Logo'
      />
      <div className='flex justify-end flex-grow'>
        <Button
          text='Find nearest car'
          locationEnabled={locationEnabled}
          clickHandler={findNearestCar}
        />
        {/* <Button text='Back to Welly' clickHandler={backToWelly} /> */}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  backToWelly: PropTypes.func.isRequired,
  findNearestCar: PropTypes.func.isRequired,
  locationEnabled: PropTypes.bool,
};

Navbar.defaultProps = { locationEnabled: false };
