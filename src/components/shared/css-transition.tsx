'use client';
import React, { useEffect, useState } from 'react';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  name?: string;
}

export type CssTransitionProps = Props;
const CssTransition: React.FC<React.PropsWithChildren<CssTransitionProps>> = ({
  children,
  className = '',
  visible = false,
  enterTime = 60,
  leaveTime = 60,
  clearTime = 60,
  name = 'transition',
  ...props
}: React.PropsWithChildren<CssTransitionProps>) => {
  const [classes, setClasses] = useState<string>('');
  const [renderable, setRenderable] = useState<boolean>(visible);

  useEffect(() => {
    const statusClassName = visible ? 'enter' : 'leave';
    const time = visible ? enterTime : leaveTime;
    if (visible && !renderable) {
      setRenderable(true);
    }

    setClasses(`${name}-${statusClassName}`);

    // set class to active
    const timer = setTimeout(() => {
      setClasses(`${name}-${statusClassName} ${name}-${statusClassName}-active`);
      clearTimeout(timer);
    }, time);

    // remove classess when animation over
    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('');
        setRenderable(false);
      }
      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);
  if (!React.isValidElement(children) || !renderable) {
    return null;
  }

  const newProps = Object.assign(props, {
    className: `${children.props.className} ${className} ${classes}`,
  });

  return React.cloneElement(children, newProps);
};

CssTransition.displayName = 'HimalayaCssTransition';
export default CssTransition;
