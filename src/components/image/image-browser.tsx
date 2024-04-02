'use client';
import React, { useMemo } from 'react';
import Link from '../link';
import { Props as LinkProps } from '../link/link';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { getHostFromUrl } from './helpers';
import ImageBrowserHttpsIcon from './image-browser-https-icon';
import { BrowserColors, getBrowserColors } from './styles';

export type ImageAnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

interface Props {
  title?: string;
  url?: string;
  showFullLink?: boolean;
  invert?: boolean;
  anchorProps?: ImageAnchorProps;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof Props>;
export type ImageBrowserProps = Props & NativeAttrs;

const getTitle = (title: string, colors: BrowserColors) => (
  <div className="title">
    {title}
    <style jsx>{`
      .title {
        color: ${colors.titleColor};
        font-size: 0.75em;
      }
    `}</style>
  </div>
);

const getAddressInput = (url: string, showFullLink: boolean, colors: BrowserColors, anchorProps: ImageAnchorProps) => (
  <div className="address-input">
    <span className="https">
      <ImageBrowserHttpsIcon />
    </span>
    <Link href={url} title={url} target="_blank" {...anchorProps}>
      {showFullLink ? url : getHostFromUrl(url)}
    </Link>
    <style jsx>{`
      .address-input {
        height: 1.75em;
        max-width: 60%;
        min-width: 40%;
        background-color: ${colors.inputBgColor};
        color: inherit;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        overflow: hidden;
        position: relative;
      }
      .address-input :global(*) {
        font-size: 0.75em;
        color: inherit;
      }
      .address-input :global(a) {
        max-width: 90%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        color: inherit;
      }
      .https {
        width: 0.75em;
        height: 0.75em;
        font-size: 1em;
        margin-right: 0.31em;
        user-select: none;
        margin-top: -1px;
        color: inherit;
        display: inline-flex;
        align-items: center;
      }
    `}</style>
  </div>
);

const ImageBrowserComponent = React.forwardRef<HTMLDivElement, React.PropsWithChildren<ImageBrowserProps>>(
  (
    {
      url,
      title,
      children,
      showFullLink = false,
      invert = false,
      anchorProps = {} as ImageAnchorProps,
      className = '',
      ...props
    }: React.PropsWithChildren<ImageBrowserProps>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const { UNIT, SCALE, CLASS_NAMES } = useScale();
    const colors = useMemo(() => getBrowserColors(invert), [invert]);
    const input = useMemo(() => {
      if (url) return getAddressInput(url, showFullLink, colors, anchorProps);
      if (title) return getTitle(title, colors);
      return null;
    }, [url, showFullLink, title, colors, anchorProps]);

    return (
      <div className={useClasses('browser', className, CLASS_NAMES)} ref={ref} {...props}>
        <header>
          <div className="traffic">
            <span className="close" />
            <span className="mini" />
            <span className="full" />
          </div>
          {input}
        </header>
        {children}
        <style jsx>{`
          .browser {
            background-color: transparent;
            box-shadow: var(--theme-expressiveness-shadow-large);
            max-width: 100%;
            overflow: hidden;
          }

          .browser :global(.image) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
          header {
            height: 2.5em;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            color: ${colors.color};
            background-color: ${colors.barBgColor};
            border-bottom: 1px solid ${colors.borderColor};
          }
          .traffic {
            width: auto;
            position: absolute;
            left: var(--layout-gap-half);
            top: 50%;
            transform: translateY(-50%);
            bottom: 0;
            height: 100%;
            display: flex;
            align-items: center;
            user-select: none;
            font-size: inherit;
          }
          .traffic span {
            border-radius: 50%;
            width: 0.75em;
            height: 0.75em;
            max-width: 20px;
            max-height: 20px;
            display: inline-block;
            margin-right: 0.5em;
          }
          .close {
            background-color: #ff5f56;
          }
          .mini {
            background-color: #ffbd2e;
          }
          .full {
            background-color: #27c93f;
          }

          ${SCALE.margin(
            0,
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            {
              right: 'auto',
              left: 'auto',
            },
            'browser',
          )}
          ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'browser')}
          ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'browser')}
          ${SCALE.w(1, value => `width: ${value};`, 'max-content', 'browser')}
          ${SCALE.h(1, value => `height: ${value};`, 'auto', 'browser')}
          ${SCALE.font(1, value => `font-size: ${value};`, undefined, 'browser')}
          ${UNIT('browser')}
        `}</style>
      </div>
    );
  },
);

ImageBrowserComponent.displayName = 'HimalayaImageBrowser';
const ImageBrowser = withScale(ImageBrowserComponent);
export default ImageBrowser;
