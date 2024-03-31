'use client';

import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { FooterPropsNativeProps } from '.';
import FooterBottomBlock from './footer-bottom-block';
import { pickChild } from '../utils/collections';
import PageWidth from '../page-width';
import useClasses from '../use-classes';
const FooterBottom: React.FC<PropsWithChildren<FooterPropsNativeProps>> = ({ children, className, ...props }) => {
  const [, footerBottomBlock] = pickChild(children, FooterBottomBlock);
  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  return (
    <div className={useClasses('footer-bottom', CLASS_NAMES, className)} {...props}>
      <PageWidth pt={0} pb={0}>
        <div className="footer-bottom-inner">{footerBottomBlock}</div>
      </PageWidth>
      <style jsx>{`
        .footer-bottom {
          border-top: 1px solid var(--color-border-1000);
        }
        .footer-bottom-inner {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }

        ${SCALE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'footer-bottom')}

        ${SCALE.padding(
          { left: 0, right: 0, top: 0.75, bottom: 0.75 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'footer-bottom',
        )}

        ${UNIT('footer-bottom')}
      `}</style>
    </div>
  );
};

export default withScale(FooterBottom);
