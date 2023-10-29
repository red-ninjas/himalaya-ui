'use client';
import React from 'react';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetTitleProps = Props & NativeAttrs;

const FieldsetTitle: React.FC<React.PropsWithChildren<FieldsetTitleProps>> = ({
  className = '',
  children,
  ...props
}: React.PropsWithChildren<FieldsetTitleProps>) => {
  const classes = useClasses('title', className);

  return (
    <>
      <div className={classes} {...props}>
        {children}
      </div>
      <style jsx>{`
        .title {
          line-height: 1.5;
          display: inline-flex;
          word-break: break-word;
          font-weight: 600;
          letter-spacing: -0.020625em;
          font-size: 1.25em;
          width: auto;
        }
      `}</style>
    </>
  );
};

FieldsetTitle.displayName = 'HimalayaFieldsetTitle';
export default FieldsetTitle;
