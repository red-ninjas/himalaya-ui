'use client';

import React, { ReactNode } from 'react';
import Avatar from '../avatar';
import useClasses from '../use-classes';
import useScale, { ScaleResponsiveParameter, withScale } from '../use-scale';

interface Props {
  name: ReactNode | string;
  src?: string;
  text?: string;
  altText?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type UserProps = Props & NativeAttrs;

const UserComponent: React.FC<React.PropsWithChildren<UserProps>> = ({
  src,
  text,
  name,
  children,
  className,
  altText,
  ...props
}: React.PropsWithChildren<UserProps>) => {
  const { SCALE_CLASSES, RESPONSIVE, SCALER, getScaleProps } = useScale();
  const scale = getScaleProps('scale') as number | undefined | ScaleResponsiveParameter<number>;
  return (
    <div className={useClasses('user', className, SCALE_CLASSES)} {...props}>
      <Avatar src={src} scale={scale} text={text} alt={altText} />
      <div className="names">
        <span className="name">{name}</span>
        <span className="social">{children}</span>
      </div>

      <style jsx>{`
        .user {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          max-width: 100%;
          font-size: var(--user-font-size);
        }

        .names {
          font-size: inherit;
          margin-left: var(--layout-gap-half);
          display: inline-flex;
          flex-direction: column;
          white-space: nowrap;
        }

        .name {
          font-size: calc(0.89 * var(--user-font-size));
          color: var(--color-background-100);
          line-height: 1.1em;
          text-transform: capitalize;
          font-weight: 500;
          max-width: 15rem;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .social {
          font-size: calc(0.75 * var(--user-font-size));
          color: var(--color-background-300);
        }

        .social :global(*:first-child) {
          margin-top: 0;
        }

        .social :global(*:last-child) {
          margin-bottom: 0;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'user')}
        ${RESPONSIVE.w(1, value => `width: ${value};`, 'max-content', 'user')}

        ${RESPONSIVE.font(1, value => `--user-font-size: ${value};`, undefined, 'user')}
        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'user')}
        ${RESPONSIVE.padding(
          {
            top: 0,
            right: 0.5,
            bottom: 0,
            left: 0.5,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'user',
        )}
        ${SCALER('user')}
      `}</style>
    </div>
  );
};

UserComponent.displayName = 'HimalayaUser';
const User = withScale(UserComponent);
export default User;
