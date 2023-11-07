'use client';

import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import useClasses from '../use-classes';
import { useConfigs } from '../use-context/config-context';
import useLayout from '../use-layout';
import useCurrentState from '../utils/use-current-state';
import usePortal from '../utils/use-portal';
import { isLeftPlacement, isTopPlacement } from './helpers';
import ToastItem from './toast-item';

const ToastContainer: React.FC<React.PropsWithChildren<unknown>> = () => {
  const layout = useLayout();
  const portal = usePortal('toast');
  const [, setHovering, hoveringRef] = useCurrentState<boolean>(false);
  const { toasts, updateToasts, toastLayout, lastUpdateToastId } = useConfigs();
  const memoizedLayout = useMemo(() => toastLayout, [toastLayout]);
  const toastElements = useMemo(
    () => toasts.map(toast => <ToastItem toast={toast} layout={memoizedLayout} key={toast._internalIdent} />),
    [toasts, memoizedLayout],
  );

  const classNames = useClasses('toasts', {
    top: isTopPlacement(toastLayout.placement),
    left: isLeftPlacement(toastLayout.placement),
  });

  const hoverHandler = (isHovering: boolean) => {
    setHovering(isHovering);
    if (isHovering) {
      return updateToasts(last =>
        last.map(toast => {
          if (!toast.visible) return toast;
          toast._timeout && window.clearTimeout(toast._timeout);
          return {
            ...toast,
            timeout: null,
          };
        }),
      );
    }

    updateToasts(last =>
      last.map((toast, index) => {
        if (!toast.visible) return toast;
        toast._timeout && window.clearTimeout(toast._timeout);
        return {
          ...toast,
          _timeout: (() => {
            const timer = window.setTimeout(
              () => {
                toast.cancel();
                window.clearTimeout(timer);
              },
              toast.delay + index * 100,
            );
            return timer;
          })(),
        };
      }),
    );
  };

  useEffect(() => {
    const index = toasts.findIndex(r => r._internalIdent === lastUpdateToastId);
    const toast = toasts[index];
    if (!toast || toast.visible || !hoveringRef.current) return;
    const hasVisible = toasts.find((r, i) => i < index && r.visible);
    if (hasVisible || !hoveringRef.current) return;
    hoverHandler(false);
  }, [toasts, lastUpdateToastId]);

  useEffect(() => {
    let timeout: null | number = null;
    const timer = window.setInterval(() => {
      if (toasts.length === 0) return;
      timeout = window.setTimeout(() => {
        const allInvisible = !toasts.find(r => r.visible);
        allInvisible && updateToasts(() => []);
        timeout && clearTimeout(timeout);
      }, 350);
    }, 5000);

    return () => {
      timer && clearInterval(timer);
      timeout && clearTimeout(timeout);
    };
  }, [toasts]);

  if (!portal) return null;
  if (!toasts || toasts.length === 0) return null;
  return createPortal(
    <div className={classNames} onMouseEnter={() => hoverHandler(true)} onMouseLeave={() => hoverHandler(false)}>
      {toastElements}
      <style jsx>{`
        .toasts {
          position: fixed;
          width: auto;
          max-width: 100%;
          right: ${layout.gap};
          bottom: ${layout.gap};
          z-index: 2000;
          transition: all 400ms ease;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
        }
        .top {
          bottom: unset;
          flex-direction: column-reverse;
          top: ${layout.gap};
        }
        .left {
          right: unset;
          left: ${layout.gap};
        }
      `}</style>
    </div>,
    portal,
  );
};

export default ToastContainer;
