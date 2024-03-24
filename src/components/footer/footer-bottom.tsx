'use client';

import React, { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { FooterProps } from '.';
import FooterBottomBlock from './footer-bottom-block';
import { pickChild } from '../utils/collections';
import useTheme from '../use-theme';
import PageWidth from '../page-width';

const FooterBottom: React.FC<PropsWithChildren<FooterProps>> = ({ children }) => {
  const [, footerBottomBlock] = pickChild(children, FooterBottomBlock);

  const { SCALES } = useScale();
  const theme = useTheme();

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
          padding: ${SCALES.pt(0.75)} ${SCALES.pr(0)} ${SCALES.pb(0.75)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
        .footer-bottom-inner {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default withScale(FooterBottom);
