'use client';

import React, { ReactNode } from 'react';
import Avatar from '../avatar';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

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
  const { getScaleProps, SCALE, UNIT, CLASS_NAMES } = useScale();

  const scale = getScaleProps('scale') as number | undefined;
  return (
    <div className={useClasses('user', className, CLASS_NAMES)} {...props}>
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

        ${SCALE.font(1, value => `font-size: ${value};`, undefined, 'user')}
        ${SCALE.w(1, value => `width: ${value};`, 'max-content', 'user')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'user')}
        ${SCALE.padding(
          {
            top: 0,
            right: 0.5,
            left: 0.5,
            bottom: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'user',
        )}
        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'user')}
        ${UNIT('user')}
      `}</style>
    </div>
  );
};

UserComponent.displayName = 'HimalayaUser';
const User = withScale(UserComponent);
export default User;
