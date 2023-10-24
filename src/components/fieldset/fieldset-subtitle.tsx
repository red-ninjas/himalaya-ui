'use client';
import React from 'react';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetSubtitleProps = Props & NativeAttrs;

const FieldsetSubtitle: React.FC<React.PropsWithChildren<FieldsetSubtitleProps>> = ({
  className = '',
  children,
  ...props
}: React.PropsWithChildren<FieldsetSubtitleProps>) => {
  return (
    <>
      <div className={className} {...props}>
        {children}
      </div>
      <style jsx>{`
        div {
          font-size: 0.875em;
          line-height: 1.6;
          letter-spacing: -0.005625em;
          margin: 0.75em 0;
        }
      `}</style>
    </>
  );
};

FieldsetSubtitle.displayName = 'HimalayaFieldsetSubtitle';
export default FieldsetSubtitle;
