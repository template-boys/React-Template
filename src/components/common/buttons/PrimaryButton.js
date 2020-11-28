import React from 'react';

export default function PrimaryButton({ isDataLoading, title, ...props }) {
  return (
    <button className='primary-button' {...props}>
      {isDataLoading ? 'Loading...' : title}
    </button>
  );
}
