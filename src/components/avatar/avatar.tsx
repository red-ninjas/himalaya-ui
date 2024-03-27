'use client';

import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  src?: string;
  text?: string;
  isSquare?: boolean;
  className?: string;
}

type NativeAttrs = Omit<Partial<React.ImgHTMLAttributes<any> & React.HTMLAttributes<any>>, keyof Props>;
export type AvatarProps = Props & NativeAttrs;

const safeText = (text: string): string => {
  if (text.length <= 4) return text;
  return text.slice(0, 3);
};

const AvatarComponent: React.FC<AvatarProps> = ({ src, text = '', isSquare = false, className = '', ...props }: AvatarProps) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();
  const classes = useClasses('avatar', className, SCALE_CLASSES);
  const showText = !src;
  return (
    <span className={classes}>
      {!showText && <img alt="avatar" className="avatar-img" src={src} draggable={false} {...props} />}
      {showText && (
        <span className="avatar-text" {...props}>
          {safeText(text)}
        </span>
      )}

      <style jsx>{`
        .avatar {
          display: inline-block;
          position: relative;
          overflow: hidden;
          border: 1px solid var(--color-border-1000);
          vertical-align: top;
          background-color: var(--color-background-1000);
          box-sizing: border-box;
          border-radius: var(--border-radius);
        }

        .avatar-img {
          display: inline-block;
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: var(--border-radius);
          user-select: none;
        }

        .avatar-text {
          position: absolute;
          left: 50%;
          top: 50%;
          text-align: center;
          transform: translate(-50%, -50%) scale(0.65);
          white-space: nowrap;
          user-select: none;
        }
        ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'avatar-text')}
        ${RESPONSIVE.w(1.75, value => `width: ${value};`, undefined, 'avatar')}
        ${RESPONSIVE.h(1.75, value => `height: ${value};`, undefined, 'avatar')}
        ${RESPONSIVE.r(1, value => `--border-radius: ${value};`, isSquare ? `var(--layout-radius)` : '50%', 'avatar')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'avatar')}
        ${RESPONSIVE.margin(
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'avatar',
        )}

        ${SCALER('avatar')}
      `}</style>
    </span>
  );
};

AvatarComponent.displayName = 'HimalayaAvatar';
const Avatar = withScale(AvatarComponent);
export default Avatar;
