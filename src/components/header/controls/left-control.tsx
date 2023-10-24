'use client';
import { PropsWithChildren } from 'react';

const LeftHeaderControl: React.FC<PropsWithChildren> = ({ ...props }) => {
  return props.children;
};

LeftHeaderControl.displayName = 'HimalyaLeftHeader';
export default LeftHeaderControl;
