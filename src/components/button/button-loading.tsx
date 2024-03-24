'use client';

import React from 'react';
import LoadingSpinner from '../loading-spinner';

const ButtonLoading: React.FC<React.PropsWithChildren> = () => {
  return (
    <div className="btn-loading">
      <LoadingSpinner />
      <style jsx>{`
        .btn-loading {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background-color: var(--ui-button-bg);
        }

        .btn-loading :global(.loading-container) {
          --spinner-color: var(--ui-button-color) !important;
        }
      `}</style>
    </div>
  );
};

ButtonLoading.displayName = 'HimalayaButtonLoading';
export default ButtonLoading;
