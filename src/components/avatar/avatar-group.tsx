'use client';

import React from 'react';
import useTheme from '../use-theme';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  count?: number;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type AvatarGroupProps = Props & NativeAttrs;

const AvatarGroupComponent: React.FC<React.PropsWithChildren<AvatarGroupProps>> = ({ count, className = '', children }: AvatarGroupProps) => {
  const { SCALER, RESPONSIVE } = useScale();

  return (
    <div className={useClasses('avatar-group', className)}>
      {children}
      {count && <span className="count">+{count}</span>}
      <style jsx>{`
        .avatar-group {
          display: flex;
          align-items: center;
        }

        .avatar-group :global(.avatar) {
          margin-left: var(--avatar-left);
        }

        .count {
          display: inline-flex;
          align-items: center;
          padding-left: 5.5px;
          color: var(--color-background-200);
        }

        ${SCALER('avatar-group')}
        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'count')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'max-content', 'avatar-group')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'avatar-group')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'avatar-group')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'avatar-group')}
        ${RESPONSIVE.ml(-0.625, value => `--avatar-left: ${value};`, undefined, 'avatar-group')}
      `}</style>
    </div>
  );
};

AvatarGroupComponent.displayName = 'HimalayaAvatarGroup';
const AvatarGroup = withScale(AvatarGroupComponent);
export default AvatarGroup;
