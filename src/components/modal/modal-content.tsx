'use client';
import React from 'react';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type ModalContentProps = Props & NativeAttrs;

const ModalContentComponent: React.FC<React.PropsWithChildren<ModalContentProps>> = ({
  className = undefined,
  children,
  ...props
}: React.PropsWithChildren<ModalContentProps>) => {
  const { SCALER, RESPONSIVE, HIDER } = useScale();

  return (
    <>
      <div className={useClasses('content', className, HIDER)} {...props}>
        {children}
      </div>
      <style jsx>{`
        .content {
          position: relative;
          text-align: left;
        }

        .content > :global(*:first-child) {
          margin-top: 0;
        }

        .content > :global(*:last-child) {
          margin-bottom: 0;
        }

        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            right: `calc(var(--modal-wrapper-padding-right) * -1)`,
            left: `calc(var(--modal-wrapper-padding-left) * -1)`,
          },
          'content',
        )}
        ${RESPONSIVE.padding(1.3125, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'content')}

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'content')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'content')}

        ${RESPONSIVE.font(1, value => `font-size: ${value};`, undefined, 'content')}
        ${RESPONSIVE.lineHeight(1, value => `line-height: ${value};`, undefined, 'content')}
        ${SCALER('content')}
      `}</style>
    </>
  );
};

ModalContentComponent.displayName = 'HimalayaModalContent';
const ModalContent = withScale(ModalContentComponent);
export default ModalContent;
