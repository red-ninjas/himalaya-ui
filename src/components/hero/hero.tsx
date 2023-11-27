'use client';

import { PropsWithChildren, useRef } from 'react';
import { ArrowDown } from '../icons';
import { ContentLayout } from '../layout';
import useLayout from '../use-layout';
import { useScale, withScale } from '../use-scale';
import useTheme from '../use-theme';
import { HeroPropsNative } from './share';

const Hero: React.FC<PropsWithChildren<HeroPropsNative>> = ({ children, withDownArrow = true, scrollToId, ...props }) => {
  const theme = useTheme();
  const layout = useLayout();
  const { SCALES } = useScale();
  const heroRef = useRef<HTMLElement | null>(null);

  const handleArrowSmoothScroll = () => {
    if (scrollToId) {
      const targetElement = document.getElementById(scrollToId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      } else {
        if (heroRef.current) {
          const nextSibling = heroRef.current.parentElement?.nextElementSibling;
          if (nextSibling) {
            nextSibling.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        console.warn(`No element found with ID '${scrollToId}'. Falling back to default scrolling behavior.`);
      }
    } else {
      console.warn("No 'scrollToId' provided.");
    }
  };

  return (
    <>
      <header {...props} className="hero full-height valign bord-thin-bottom" ref={heroRef}>
        <ContentLayout>
          <div className="hero-inner">{children}</div>
        </ContentLayout>
        {withDownArrow && (
          <div className="arrow-down main-bg">
            <div className="shine-effect arrow-down-inner" onClick={handleArrowSmoothScroll}>
              <ArrowDown width={20}></ArrowDown>
            </div>
          </div>
        )}
      </header>

      <style jsx>{`
        body {
          scroll-behavior: smooth;
        }
        .hero {
          align-items: center;
          position: relative;
          display: flex;
          border-bottom: 1px solid ${theme.palette.border};
          min-height: calc(${SCALES.height(0, '100vh')} - ${withDownArrow ? 50 : 0}px);
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)} ${SCALES.ml(0, 'auto')};
        }
        .actions {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-top: 64px;
        }

        .arrow-down {
          width: 100px;
          height: 100px;
          cursor: pointer;
          text-align: center;
          border: 1px solid ${theme.palette.border};
          border-radius: 50%;
          position: absolute;
          bottom: -50px;
          left: calc(50% - 50px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: ${theme.palette.background};
        }
        .arrow-down-inner {
          display: flex;
          align-items: center;
          border-radius: 50%;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .arrow-down:after {
          content: '';
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          border-radius: 50%;
          border-left: 1px dashed ${theme.palette.accents_4};
          opacity: 0.4;
          -webkit-transform: rotate(90deg);
          -ms-transform: rotate(90deg);
          transform: rotate(90deg);
        }

        .hero-inner {
          --bs-gutter-x: 1.5rem;
          --bs-gutter-y: 0;
          display: flex;
          flex-wrap: wrap;
          margin-top: calc(var(--bs-gutter-y) * -1);
          justify-content: center;
          margin-top: ${withDownArrow ? 50 : 0}px;
          margin-bottom: ${withDownArrow ? 100 : 0}px;
          text-align: center;
          gap: ${layout.gap};
          flex-direction: column;
        }
        .container {
          width: 100%;
          padding-right: var(--bs-gutter-x, 0.75rem);
          padding-left: var(--bs-gutter-x, 0.75rem);
          margin-right: auto;
          margin-left: auto;
        }
      `}</style>
    </>
  );
};

export default withScale(Hero);
