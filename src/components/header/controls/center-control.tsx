'use client';
import { PropsWithChildren } from 'react';

const CenterHeaderControl: React.FC<PropsWithChildren> = ({ ...props }) => {
  return props.children;
};

CenterHeaderControl.displayName = 'HimalyaCenterHeader';
export default CenterHeaderControl;
