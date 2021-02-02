import React from 'react';

export default function Navbar() {
  //   const backToWelly = () => {
  //     setViewport({
  //       ...viewport,
  //       longitude: 174.790984,
  //       latitude: -41.292757,
  //       zoom: 12,
  //       transitionDuration: 8000,
  //       transitionInterpolator: new FlyToInterpolator(),
  //     });
  //   };

  return (
    <nav className='bg-mevo-main'>
      <img
        className='w-auto h-10'
        src='https://assets.mevo.co.nz/brand/logo-light.svg'
        alt='Mevo Logo'
      />
    </nav>
  );
}
