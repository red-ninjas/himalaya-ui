'use client';
import React from 'react';

const CheckboxIconComponent: React.FC = () => {
  return (
    <>
      <svg fill="none" height="16" viewBox="0 0 20 20" width="16">
        <path d="M14 7L8.5 12.5L6 10" stroke="var(--checkbox-color)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
      </svg>
      <style jsx>{`
        svg {
          display: inline-flex;
          width: var(--checkbox-size);
          height: var(--checkbox-size);
          user-select: none;
        }
      `}</style>
    </>
  );
};

CheckboxIconComponent.displayName = 'HimalayaCheckboxIcon';
const CheckboxIcon = React.memo(CheckboxIconComponent);

export default CheckboxIcon;
