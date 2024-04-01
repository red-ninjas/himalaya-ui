import React from 'react';

const ButtonDropdownIcon: React.FC = () => {
  return (
    <svg
      stroke={`var(--ui-dropdown-color)`}
      viewBox="0 0 24 24"
      width={`auto`}
      height={`auto`}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <path d="M6 9l6 6 6-6" />

      <style jsx>{`
        svg {
          transform: scale(0.6);
          width: var(--ui-dropdown-height);
          height: var(--ui-dropdown-height);
          color: var(--ui-dropdown-color);
          stroke: var(--ui-dropdown-color);
        }
      `}</style>
    </svg>
  );
};

ButtonDropdownIcon.displayName = 'HimalayaButtonDropdownIcon';
export default ButtonDropdownIcon;
