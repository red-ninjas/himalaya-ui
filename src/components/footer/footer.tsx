'use client';
import React from 'react';
import { PropsWithChildren } from 'react';
import useScale, { withScale } from '../use-scale';
import { FooterProps } from '.';
import { pickChild } from '../utils/collections';
import FooterBlock from './footer-block';
import FooterBottom from './footer-bottom';
import { ContentLayout } from '../layout';
import useTheme from '../use-theme';

const Footer: React.FC<PropsWithChildren<FooterProps>> = ({ children }) => {
  const [, footerBottom] = pickChild(children, FooterBottom);
  const [, footerBlock] = pickChild(children, FooterBlock);

  const { SCALES } = useScale();
  const theme = useTheme();
  return (
    <>
      <footer className="footer">
        <ContentLayout paddingTop={SCALES.pt(2)} paddingBottom={SCALES.pb(2)}>
          <div className="blocks">{footerBlock}</div>
        </ContentLayout>
        {footerBottom}
      </footer>

      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          border-top: 1px solid ${theme.palette.border};
        }
        .blocks {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      `}</style>
    </>
  );
};

export default withScale(Footer);
