'use client';
import React, { MouseEvent } from 'react';
import useClasses from '../use-classes';
import useScale from '../use-scale';
import useCurrentState from '../utils/use-current-state';
import CssTransition from './css-transition';

interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  visible?: boolean;
  onContentClick?: (event: MouseEvent<HTMLElement>) => void;
  backdropClassName?: string;
  positionClassName?: string;
  layerClassName?: string;
  background?: string;
  transitionTime?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type BackdropProps = Props & NativeAttrs;

const Backdrop: React.FC<React.PropsWithChildren<BackdropProps>> = React.memo(
  ({
    children,
    onClick = () => {},
    visible = false,
    background = 'black',
    onContentClick = () => {},
    backdropClassName = '',
    positionClassName = '',
    layerClassName = '',
    transitionTime = 150,
    ...props
  }: React.PropsWithChildren<BackdropProps>) => {
    const { SCALE } = useScale();
    const [, setIsContentMouseDown, IsContentMouseDownRef] = useCurrentState(false);
    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      if (IsContentMouseDownRef.current) return;
      onClick && onClick(event);
    };
    const mouseUpHandler = () => {
      if (!IsContentMouseDownRef.current) return;
      const timer = setTimeout(() => {
        setIsContentMouseDown(false);
        clearTimeout(timer);
      }, 0);
    };

    return (
      <CssTransition name="backdrop-wrapper" visible={visible} clearTime={300}>
        <div className={useClasses('backdrop', backdropClassName)} onClick={clickHandler} onMouseUp={mouseUpHandler} {...props}>
          <div className={useClasses('layer', layerClassName)} />
          <div onClick={onContentClick} className={useClasses('position width', positionClassName)} onMouseDown={() => setIsContentMouseDown(true)}>
            {children}
          </div>
          <style jsx>{`
            .backdrop {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              overflow: auto;
              z-index: 1000;
              -webkit-overflow-scrolling: touch;
              box-sizing: border-box;
              text-align: center;
            }
            .position {
              position: relative;
              z-index: 1001;
              outline: none;
              margin: 20px auto;
              vertical-align: middle;
              display: inline-block;
            }
            .backdrop:before {
              display: inline-block;
              width: 0;
              height: 100%;
              vertical-align: middle;
              content: '';
            }
            .layer {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              width: 100%;
              height: 100%;
              opacity: var(--theme-expressiveness-portal-opacity);
              background-color: ${background};
              transition: opacity ${transitionTime}ms cubic-bezier(0.4, 0, 0.2, 1);
              pointer-events: none;
              z-index: 1000;
            }
            .backdrop-wrapper-enter .layer {
              opacity: 0;
            }
            .backdrop-wrapper-enter-active .layer {
              opacity: var(--theme-expressiveness-portal-opacity);
            }
            .backdrop-wrapper-leave .layer {
              opacity: var(--theme-expressiveness-portal-opacity);
            }
            .backdrop-wrapper-leave-active .layer {
              opacity: 0;
            }

            ${SCALE.w(1, value => `width: ${value};`, '450px')}
          `}</style>
        </div>
      </CssTransition>
    );
  },
);

Backdrop.displayName = 'HimalayaBackdrop';
export default Backdrop;
