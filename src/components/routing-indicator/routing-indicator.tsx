'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import Progress from '../progress';
import { usePathname, useSearchParams } from 'next/navigation';
import useClasses from '../use-classes';

const RoutingIndicator: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    setIsActive(false);
    return () => {
      setIsActive(true);
    };
  }, [pathname, searchParams]);

  return (
    <>
      {children}
      <div
        className={useClasses('routing-indicator', {
          active: isActive,
        })}
      >
        <Progress height={'5px'} type="success" radius={0} indeterminate={true}></Progress>
      </div>

      <style jsx>{`
        .routing-indicator {
          width: 100%;
          position: absolute;
          top: 0;
          z-index: 99;
          overflow: hidden;
          display: none;
        }
        .routing-indicator.active {
          display: block;
        }
      `}</style>
    </>
  );
};

export default RoutingIndicator;
