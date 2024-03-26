'use client';

import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { FooterProps } from '.';
import FooterBottomBlock from './footer-bottom-block';
import { pickChild } from '../utils/collections';
import PageWidth from '../page-width';
const FooterBottom: React.FC<PropsWithChildren<FooterProps>> = ({ children }) => {
  const [, footerBottomBlock] = pickChild(children, FooterBottomBlock);
  const { RESPONSIVE, SCALER } = useScale();
  return (
    <>
      <div className="footer-bottom">
        <PageWidth pt={0} pb={0}>
          <div className="footer-bottom-inner">{footerBottomBlock}</div>
        </PageWidth>
      </div>
      <style jsx>{`
        .footer-bottom {
          border-top: 1px solid var(--color-border-1000);
        }
        .footer-bottom-inner {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }

        ${RESPONSIVE.margin(0, value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'footer-bottom')}

        ${RESPONSIVE.padding(
          { left: 0, right: 0, top: 0.75, bottom: 0.75 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'footer-bottom',
        )}

        ${SCALER('footer-bottom')}
      `}</style>
    </>
  );
};

export default withScale(FooterBottom);
