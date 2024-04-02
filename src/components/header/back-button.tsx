'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Button, { ButtonProps } from '../button';
import { ChevronLeft } from '../icons';
import { ScaleProps } from '../use-scale';

const BackButton: React.FC<
  {
    url?: string;
  } & ButtonProps &
    ScaleProps
> = ({ onClick, url, ...props }) => {
  const router = useRouter();
  const onClickAction = () => {
    if (url) {
      router.replace(url);
    }
  };
  return (
    <Button
      style={{ '--ui-button-height': 'calc(var(--scale-unit-scale) * 4)' } as React.CSSProperties}
      {...props}
      auto
      ml={'calc(var(--scale-unit-scale) * -0.8)'}
      px={0.4}
      type="abort"
      scale={2 / 3}
      iconRight={<ChevronLeft />}
      onClick={onClick ?? onClickAction}
    ></Button>
  );
};

export default BackButton;
