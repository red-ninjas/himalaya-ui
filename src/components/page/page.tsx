'use client';
import useClasses from '../use-classes';
import React, { useEffect, useState } from 'react';
import useScale, { withScale } from '../use-scale';
import { hasChild } from '../utils/collections';
import { tuple } from '../utils/prop-types';
import PageContent from './page-content';

const renderMode = tuple('default', 'effect', 'effect-seo');
export type PageRenderMode = (typeof renderMode)[number];

interface Props {
  render?: PageRenderMode;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type PageProps = Props & NativeAttrs;

const PageComponent: React.FC<React.PropsWithChildren<PageProps>> = ({
  children,
  render = 'default' as PageRenderMode,
  className,
  ...props
}: React.PropsWithChildren<PageProps>) => {
  const { RESPONSIVE, SCALER, HIDER } = useScale();
  const [preventRender, setPreventRender] = useState<boolean>(render !== 'default');

  useEffect(() => {
    setPreventRender(false);
  }, []);

  if (preventRender) {
    const renderSEO = render === 'effect-seo';
    if (!renderSEO) return null;
    return (
      <div className="hidden" aria-hidden="true">
        {children}
        <style jsx>{`
          .hidden {
            opacity: 0;
            display: none;
          }
        `}</style>
      </div>
    );
  }

  const hasContent = hasChild(children, PageContent);

  return (
    <section className={useClasses('page-section', className, HIDER)} {...props}>
      {hasContent ? children : <PageContent>{children}</PageContent>}
      <style jsx>{`
        .page-section {
          max-width: 100vw;
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
        }

        ${RESPONSIVE.h(1, value => `height: ${value};`, 'auto', 'page-section')}
        ${RESPONSIVE.w(1, value => `width: ${value}};`, `calc(100% - 100pt)`, 'page-section')}

        ${RESPONSIVE.padding(
          { left: 1.34, right: 1.34, top: 0, bottom: 0 },
          value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          undefined,
          'page-section',
        )}

        ${RESPONSIVE.margin(
          0,
          value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
          {
            top: undefined,
            right: 'auto',
            left: 'auto',
            bottom: undefined,
          },
          'page-section',
        )}

        ${SCALER('page-section')}
      `}</style>
    </section>
  );
};

PageComponent.displayName = 'HimalayaPage';
const Page = withScale(PageComponent);
export default Page;
