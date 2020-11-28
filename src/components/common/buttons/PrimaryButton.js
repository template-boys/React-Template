import React from 'react';

export default function PrimaryButton({
  type,
  isDataLoading,
  title,
  customStyle,
}) {
  return (
    <button type={type} className='primary-button' style={customStyle}>
      {isDataLoading ? 'Loading...' : title}
    </button>
  );
}
