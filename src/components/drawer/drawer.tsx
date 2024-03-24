'use client';
import React, { MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../shared/backdrop';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { withScale } from '../use-scale';
import useBodyScroll from '../utils/use-body-scroll';
import usePortal from '../utils/use-portal';
import DrawerWrapper from './drawer-wrapper';
import { DrawerPlacement } from './helper';

interface Props {
  visible?: boolean;
  keyboard?: boolean;
  disableBackdropClick?: boolean;
  onClose?: () => void;
  onContentClick?: (event: MouseEvent<HTMLElement>) => void;
  wrapClassName?: string;
  placement?: DrawerPlacement;
  backdropBackground?: string;
  transitionTime?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type DrawerProps = Props & NativeAttrs;

const DrawerComponent: React.FC<React.PropsWithChildren<DrawerProps>> = ({
  visible: customVisible,
  keyboard = true,
  disableBackdropClick = false,
  onClose,
  onContentClick,
  wrapClassName = '',
  children,
  backdropBackground,
  transitionTime = 300,
  ...props
}: React.PropsWithChildren<DrawerProps>) => {
  const portal = usePortal('drawer');
  const [visible, setVisible] = useState<boolean>(false);
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 });

  const closeDrawer = () => {
    onClose && onClose();
    setVisible(false);
    setBodyHidden(false);
  };

  useEffect(() => {
    if (typeof customVisible === 'undefined') return;
    setVisible(customVisible);
    setBodyHidden(customVisible);
  }, [customVisible]);

  const { bindings } = useKeyboard(
    () => {
      keyboard && closeDrawer();
    },
    KeyCode.Escape,
    {
      disableGlobalEvent: true,
    },
  );

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return;
    closeDrawer();
  };

  if (!portal) return null;
  return createPortal(
    <Backdrop
      transitionTime={transitionTime}
      background={backdropBackground}
      onClick={closeFromBackdrop}
      onContentClick={onContentClick}
      visible={visible}
      {...bindings}
    >
      <DrawerWrapper leaveTime={transitionTime} enterTime={transitionTime} visible={visible} className={wrapClassName} {...props}>
        {children}
      </DrawerWrapper>
    </Backdrop>,
    portal,
  );
};

DrawerComponent.displayName = 'HimalayaDrawer';
const Drawer = withScale(DrawerComponent);
export default Drawer;
