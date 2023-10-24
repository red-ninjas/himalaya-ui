'use client';
import { PropsWithChildren } from 'react';

const RightHeaderControl: React.FC<PropsWithChildren> = ({ ...props }) => {
  return props.children;
};

RightHeaderControl.displayName = 'HimalyaRightHeader';
export default RightHeaderControl;
