'use client';

import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import useLayout from '../use-layout';

import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import Title from './title';

export interface LogoProps {
  logoBackground?: string;
  title?: string;
  url?: string;
  size?: number;
  logoOnMobile?: boolean;
  titleOnMobile?: boolean;
}

const Logo: React.FC<PropsWithChildren<LogoProps>> = ({
  children,
  logoBackground,
  title = '',
  url = '/',
  size = 30,
  logoOnMobile = false,
  titleOnMobile = true,
}) => {
  const theme = useTheme();
  const layout = useLayout();
  const { SCALES } = useScale();
  return (
    <div className="logo">
      <Link legacyBehavior passHref href={url || '/'}>
        <a className="logo-inner">
          <div className="logo-container" draggable={false}>
            {children}
          </div>
          {title && (
            <div className="title">
              <Title>{title}</Title>
            </div>
          )}
        </a>
      </Link>
      <style jsx>{`
        .logo-inner {
          display: inline-flex;
          gap: 8px;
        }
        .logo-container {
          width: 100%;
          height: ${size ? size + 'px' : '100%'};
          width: ${size ? size + 'px' : '100%'};
          background: ${logoBackground || theme.palette.background};
          border: 1px solid ${theme.palette.border};
          border-radius: 50%;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .title {
          display: inline-block;
        }
        .title.show {
          display: block;
        }
        .logo {
          flex: 1 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;

          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }
        .logo a {
          display: inline-flex;
          flex-direction: row;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          color: inherit;
          height: 30px;
        }
        @media only screen and (max-width: ${layout.breakpoints.xs.max}) {
          .title {
            display: ${titleOnMobile === true ? 'block' : 'none'};
          }

          .logo-container {
            display: ${logoOnMobile === true ? 'inline-flex' : 'none'};
          }
        }
      `}</style>
    </div>
  );
};

Logo.displayName = 'HimalayaLogo';
export default withScale(Logo);
