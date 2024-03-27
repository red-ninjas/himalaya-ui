'use client';
import React from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLParagraphElement>, keyof Props>;
export type ModalSubtitleProps = Props & NativeAttrs;

const ModalSubtitleComponent: React.FC<React.PropsWithChildren<ModalSubtitleProps>> = ({
  className = undefined,
  children,
  ...props
}: React.PropsWithChildren<ModalSubtitleProps>) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();

  return (
    <>
      <p className={useClasses('modal-sub-title', className, HIDER)} {...props}>
        {children}
      </p>
      <style jsx>{`
        .modal-sub-title {
          font-weight: normal;
          display: inline-block;
          text-align: center;
          word-break: break-word;
          text-transform: uppercase;
          color: var(--color-background-400);
        }

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-sub-title')}
        ${RESPONSIVE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'modal-sub-title')}

        ${RESPONSIVE.w(1, value => `width: ${value};`, 'auto', 'modal-sub-title')}
        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'modal-sub-title')}

        ${RESPONSIVE.font(0.875, value => `font-size: ${value};`, undefined, 'modal-sub-title')}
        ${RESPONSIVE.lineHeight(1.32, value => `line-height: ${value};`, undefined, 'modal-sub-title')}
        ${SCALER('modal-sub-title')}
      `}</style>
    </>
  );
};

ModalSubtitleComponent.displayName = 'HimalayaModalSubtitle';
const ModalSubtitle = withScale(ModalSubtitleComponent);
export default ModalSubtitle;
