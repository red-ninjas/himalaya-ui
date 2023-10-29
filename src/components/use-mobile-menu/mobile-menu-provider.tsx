'use client';
import React, { useEffect, useState } from 'react';
import { MobileMenuContext } from './mobile-menu-context';
import useClasses from '../use-classes';
import { MobileMenuProviderProps } from '.';
import { usePathname } from 'next/navigation';

const MobileMenuProvider: React.FC<React.PropsWithChildren<MobileMenuProviderProps>> = ({ children, contentAnimationTime = 300, direction = 'left' }) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsEnabled(false);
  }, [pathname]);
  return (
    <MobileMenuContext.Provider
      value={{
        isEnabled,
        setIsEnabled,
      }}
    >
      <div
        className={useClasses('mobile-menu-container', {
          'mobile-menu-active': isEnabled,
        })}
      >
        {children}
      </div>

      <style jsx>{`
        .mobile-menu-container {
          width: 100%;
          height: 100%;
          transform-origin: ${direction == 'left' ? 'right' : 'left'} top;
          transition: transform ${contentAnimationTime}ms ease-out;
        }
        .mobile-menu-active {
          transition: all ${contentAnimationTime}ms ease-in;
          transform: scale(0.95);
          transform-origin: ${direction == 'left' ? 'right' : 'left'} top;
        }
      `}</style>
    </MobileMenuContext.Provider>
  );
};

MobileMenuProvider.displayName = 'HimalayaMobileMenuProvider';
export default MobileMenuProvider;
