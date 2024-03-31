'use client';
import React, { PropsWithChildren } from 'react';
import { FooterPropsNativeProps } from '.';
import PageWidth from '../page-width';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import FooterBlock from './footer-block';
import FooterBottom from './footer-bottom';
import useClasses from '../use-classes';

const Footer: React.FC<PropsWithChildren<FooterPropsNativeProps>> = ({ children, className, ...props }) => {
  const [, footerBottom] = pickChild(children, FooterBottom);
  const [, footerBlock] = pickChild(children, FooterBlock);

  const { SCALE, UNIT, CLASS_NAMES } = useScale();
  return (
    <footer className={useClasses('footer', className, CLASS_NAMES)} {...props}>
      <PageWidth py={0}>
        <div className="blocks">{footerBlock}</div>
      </PageWidth>
      {footerBottom}

      <style jsx>{`
        .footer {
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          border-top: 1px solid var(--color-border-1000);
        }
        .blocks {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        ${SCALE.padding(
          {
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
          },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'footer',
        )}
        ${UNIT('footer')}
      `}</style>
    </footer>
  );
};

export default withScale(Footer);
