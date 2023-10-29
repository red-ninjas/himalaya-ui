'use client';

import { ChevronLeft } from '../icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import Button from '../button';

const BackButton: React.FC<{
  onClick?: () => void;
  url?: string;
}> = ({ ...props }) => {
  const router = useRouter();
  const onClick = () => {
    if (props.url) {
      router.replace(props.url);
    } else if (props.onClick) {
      props.onClick();
    }
  };
  return (
    <div className="back-menu-button-outer">
      <Button className="menu-back-button" auto type="abort" onClick={onClick}>
        <ChevronLeft size="1.5rem" />
      </Button>

      <style jsx>{`
        .back-menu-button-outer {
          display: inline-block;
        }
        .back-menu-button-outer :global(.menu-back-button) {
          display: flex;
          align-items: center;
          min-width: 40px;
          height: 40px;
          padding: 0;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default BackButton;
