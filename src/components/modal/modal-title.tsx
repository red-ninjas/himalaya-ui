'use client';
import useClasses from '../use-classes';
import React from 'react';
import useScale, { withScale } from '../use-scale';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLHeadingElement>, keyof Props>;
export type ModalTitleProps = Props & NativeAttrs;

const ModalTitleComponent: React.FC<React.PropsWithChildren<ModalTitleProps>> = ({
  className = undefined,
  children,
  ...props
}: React.PropsWithChildren<ModalTitleProps>) => {
  const { SCALE, UNIT, CLASS_NAMES } = useScale();

  return (
    <>
      <h2 className={useClasses('modal-title', className, CLASS_NAMES)} {...props}>
        {children}
      </h2>
      <style jsx>{`
        .modal-title {
          font-weight: 500;
          text-align: center;
          display: inline-flex;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
          word-break: break-word;
          text-transform: capitalize;
          color: var(--color-foreground-1000);
        }

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-title')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-title')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'modal-title')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'modal-title')}
        ${SCALE.font(1.5, value => `font-size: ${value};`, undefined, 'modal-title')}
        ${SCALE.lineHeight(2.4, value => `line-height: ${value};`, undefined, 'modal-title')}
        ${UNIT('modal-title')}
      `}</style>
    </>
  );
};

ModalTitleComponent.displayName = 'HimalayaModalTitle';
const ModalTitle = withScale(ModalTitleComponent);
export default ModalTitle;
