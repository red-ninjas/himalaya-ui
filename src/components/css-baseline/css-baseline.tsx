'use client';

import { useConfigs } from 'components';
import { UIColorTypes, UiOverrideColors } from '../themes/presets';
import _ from 'lodash';
import React, { useMemo } from 'react';
import { hexToRgb } from '../utils/color';
export const tuple = <T extends UIColorTypes[]>(...args: T) => args;

const CssBaseline: React.FC = () => {
  const { themes, layout, theme } = useConfigs();

  const [COLOR_CLASS_NAMES] = useMemo(() => {
    let vars: string = `  .color-default {
      --color-base: var(--color-background-1000);
      --color-base-rgb: var(--color-background-1000-rgb);
      --color-contrast: var(--color-foreground-1000);
      --color-contrast-rgb: var(--color-foreground-1000-rgb);
      --color-shade: var(--color-background-900);
      --color-shade-rgb: var(--color-background-900-rgb);
      --color-tint: var(--color-background-800);
      --color-tint-rgb: var(--color-background-800-rgb);
      --color-border: var(--color-border-1000);
      --color-shade-border: var(--color-border-800);
      --color-tint-border: var(--color-border-600);
      --color-border-rgb: var(--color-border-1000-rgb);
      --color-shade-border-rgb: var(--color-border-800-rgb);
      --color-tint-border-rgb: var(--color-border-600-rgb);
    }

    .color-dark {
      --color-base: var(--color-foreground-1000);
      --color-base-rgb: var(--color-foreground-1000-rgb);
      --color-contrast: var(--color-background-1000);
      --color-contrast-rgb: var(--color-background-1000-rgb);
      --color-shade: var(--color-foreground-900);
      --color-shade-rgb: var(--color-foreground-900-rgb);
      --color-tint: var(--color-foreground-700);
      --color-tint-rgb: var(--color-foreground-700-rgb);
      --color-border: var(--color-border-1000);
      --color-shade-border: var(--color-border-800);
      --color-tint-border: var(--color-border-600);
      --color-border-rgb: var(--color-border-1000-rgb);
      --color-shade-border-rgb: var(--color-border-800-rgb);
      --color-tint-border-rgb: var(--color-border-600-rgb);
    }

    .color-abort {
      --color-base: transparent;
      --color-contrast: var(--color-foreground-1000);
      --color-contrast-rgb: var(--color-foreground-1000-rgb);
      --color-shade: var(--color-background-900);
      --color-tint: var(--color-background-700);
      --color-shade-rgb: var(--color-background-900-rgb);
      --color-tint-rgb: var(--color-background-700-rgb);
      --color-shade-border: var(--color-base);
      --color-tint-border: var(--color-base);
      --color-border: var(--color-base);
    }`;

    for (const key of UiOverrideColors) {
      const colorKey = _.kebabCase(key);
      vars += `.color-${colorKey} {
        --color-base: var(--color-${colorKey}-1000);
        --color-base-rgb: var(--color-${colorKey}-1000-rgb);
        --color-contrast: var(--color-${colorKey}-contrast);
        --color-contrast-rgb: var(--color-${colorKey}-contrast-rgb);
        --color-shade: var(--color-${colorKey}-1200);
        --color-tint: var(--color-${colorKey}-800);
        --color-shade-rgb: var(--color-${colorKey}-1200-rgb);
        --color-tint-rgb: var(--color-${colorKey}-800-rgb);
        --color-shade-border: var(--color-shade);
        --color-tint-border: var(--color-tint);
        --color-border: var(--color-base);
        --color-border-rgb:var(--color-base-rgb);
        --color-shade-border-rgb:var(--color-shade-rgb);
        --color-tint-border-rgb:var(--color-tint-rgb);
      }`;
    }

    return [vars];
  }, []);

  const layoutVars: string = useMemo(() => {
    let cssCode: string = ``;

    for (const key of Object.keys(layout)) {
      const value = layout[key];
      const kebabCaseString = _.kebabCase(key);

      if (key !== 'breakpoints') {
        cssCode += `--layout-${kebabCaseString}: ${value};`;
      }
    }
    return cssCode;
  }, [layout]);

  const [BREAKPOINT_CLASSES, BREAKPOINT_TOGGLE] = useMemo(() => {
    let breakpointCode: string = `
      .hide { display: none !important; }
      .show { display: inherit !important; }
    `;
    let breakPointsVars: string = ``;

    const breakpoints = layout.breakpoints;

    for (const breakpointKey of Object.keys(breakpoints)) {
      const breakPointValue = breakpoints[breakpointKey];
      const breakpointKeyCase = _.kebabCase(breakpointKey);

      for (const responsiveKey of Object.keys(breakPointValue)) {
        const responsiveValue = breakPointValue[responsiveKey];
        const responsiveCaseKey = _.kebabCase(responsiveKey);

        breakPointsVars += `--layout-breakpoint-${breakpointKeyCase}-${responsiveCaseKey}: ${responsiveValue};`;
      }

      breakpointCode += `
      @media only screen and (max-width: ${breakpoints[breakpointKey].max}) {
        .hide-${breakpointKey}-down {
          display: none !important;
        }
        .show-${breakpointKey}-down {
          display: block !important;
        }
      }
      @media only screen and (min-width: ${breakpoints[breakpointKey].min}) {
        .hide-${breakpointKey}-up {
          display: none !important;
        }
        .show-${breakpointKey}-up {
          display: block !important;
        }
      }
      @media only screen and (min-width: ${breakpoints[breakpointKey].min}) and (max-width: ${breakpoints[breakpointKey].max}) {
        .hide-${breakpointKey} {
          display: none !important;
        }
        .show-${breakpointKey} {
          display: block !important;
        }
      }
      `;
    }
    return [breakPointsVars, breakpointCode];
  }, [layout.breakpoints]);

  const [THEME_CLASS_NAMES, THEME_MEDIA_QUERY] = useMemo(() => {
    let totalVars: string = ``;
    let colorCss: string = ``;
    for (const currentTheme of themes) {
      let vars: string = ``;

      const colorKeys = Object.keys(currentTheme.palette);
      for (const key of Object.keys(currentTheme.font)) {
        const kebabCaseString = _.kebabCase(key);
        vars += `--theme-font-${kebabCaseString}: ${currentTheme.font[key]};`;
      }

      for (const key of colorKeys) {
        const value = currentTheme.palette[key];

        if (key.startsWith('gradient_')) {
          const gradientIndex = key.replace('gradient_', '');
          vars += `--gradient-${gradientIndex}-from: ${value.from}; --gradient-${gradientIndex}-to: ${value.to}; `;
        } else {
          for (const colorKey of Object.keys(value)) {
            vars += `--color-${key}-${colorKey.replace('hex_', '')}: ${value[colorKey]}; --color-${key}-${colorKey.replace('hex_', '')}-rgb: ${hexToRgb(value[colorKey])};`;
          }
        }
      }

      colorCss += `
        .${currentTheme.type} {
          ${vars}
        }
      `;

      totalVars += `
        @media (prefers-color-scheme: ${currentTheme.type}) {
         ${vars}
       }`;
    }

    return [totalVars, colorCss];
  }, [themes]);

  return (
    <style jsx global>
      {`
        html {
          ${layoutVars}
        }

        ${THEME_MEDIA_QUERY}

        body {
          background-color: var(--color-background-1000);
          color: var(--color-foreground-1000);

          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;

          margin: 0;
          padding: 0;
          font-family: var(--theme-font-sans);
          font-size: var(--theme-font-base-size) px;
          --ui-icon-background: var(--color-background-1000);
          --ui-icon-foreground: var(--color-foreground-1000);

          ${THEME_CLASS_NAMES}
          ${COLOR_CLASS_NAMES}
          ${BREAKPOINT_CLASSES}
          ${BREAKPOINT_TOGGLE}
        }

        html,
        body {
          height: 100%;
        }

        *,
        *:before,
        *:after {
          box-sizing: border-box;
          text-rendering: optimizeLegibility;
          -webkit-tap-highlight-color: transparent;
        }

        p,
        small {
          color: inherit;
          font-family: var(--theme-font-sans);
        }

        p {
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
        }

        small {
          font-weight: 400;
          font-size: 0.87rem;
          line-height: 1.25rem;
        }

        b {
          font-weight: 600;
        }

        span {
          font-size: inherit;
          color: inherit;
          font-weight: inherit;
        }

        img {
          max-width: 100%;
        }

        a {
          cursor: pointer;
          font-size: inherit;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          -webkit-box-align: center;
          align-items: center;
          color: var(--color-link-1000);
          text-decoration: ${theme.expressiveness.linkStyle};

          &:hover {
            text-decoration: ${theme.expressiveness.linkHoverStyle};
          }
        }

        ul,
        ol {
          padding: 0;
          list-style-type: none;
          margin: var(--layout-gap-half) var(--layout-gap-half) var(--layout-gap-half) var(--layout-gap);
          color: var(--color-foreground-1000);
          position: relative;
        }

        ol {
          list-style-type: decimal;
        }

        li {
          margin-bottom: 0.625em;
          font-size: 1em;
          line-height: 1.625em;
        }

        ul li:before {
          content: '–';
          display: inline-block;
          color: var(--color-background-500);
          position: absolute;
          margin-left: -0.9375em;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: inherit;
          margin: 0 0 0.7rem 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }

        h1 {
          font-size: 2.1875rem;
          line-height: 2.5rem;
          letter-spacing: 0;
          font-weight: 600;
        }

        h2 {
          font-size: 1.6875rem;
          line-height: 1.875rem;
          letter-spacing: 0;
          font-weight: 600;
        }

        h3 {
          font-size: 1.1875rem;
          line-height: 1.4375rem;
          letter-spacing: 0;
          font-weight: 600;
        }

        h4 {
          font-size: 1.0625rem;
          line-height: 1.25rem;
          letter-spacing: 0;
          font-weight: 600;
        }

        h5 {
          font-size: 0.95rem;
          line-height: 1.2rem;
          font-weight: 600;
        }

        h6 {
          font-size: 0.75rem;
          line-height: 1rem;
          font-weight: 600;
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
          color: inherit;
          margin: 0;
        }

        button:focus,
        input:focus,
        select:focus,
        textarea:focus {
          outline: none;
        }

        code {
          color: var(--color-code-1000);
          font-family: var(--theme-font-mono);
          font-size: 0.9em;
          white-space: pre-wrap;
          font-weight: normal;
        }

        code:before,
        code:after {
          content: '${`\``}';
        }

        pre {
          padding: calc(var(--layout-gap) * 0.9) var(--layout-gap);
          margin: var(--layout-gap) 0;
          border: 1px solid var(--color-border-1000);
          border-radius: var(--layout-radius);
          font-family: var(--theme-font-mono);
          white-space: pre;
          overflow: auto;
          line-height: 1.5;
          text-align: left;
          font-size: 14px;
          -webkit-overflow-scrolling: touch;

          background-color: var(--color-background-900);
        }

        .pre:has(header) {
          border-radius: var(--layout-radius);
          pre {
            border-radius: 0;
          }
        }

        pre code {
          color: var(--color-primary-1000);
          font-size: 1em;
          line-height: 1.25em;
          white-space: pre;
        }

        pre code:before,
        pre code:after {
          display: none;
        }

        pre :global(p) {
          margin: 0;
        }

        pre::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
          background: transparent;
        }

        hr {
          border-color: var(--color-border-1000);
        }

        details {
          background-color: var(--color-background-800);
          border: none;
        }

        details:focus,
        details:hover,
        details:active {
          outline: none;
        }

        summary {
          cursor: pointer;
          user-select: none;
          list-style: none;
          outline: none;
        }

        summary::marker,
        summary::before,
        summary::-webkit-details-marker {
          display: none;
        }

        summary::-moz-list-bullet {
          font-size: 0;
        }

        summary:focus,
        summary:hover,
        summary:active {
          outline: none;
          list-style: none;
        }

        blockquote {
          padding: calc(0.667 * var(--layout-gap)) var(--layout-gap);
          color: var(--color-background-400);
          background-color: var(--color-background-900);
          border-radius: var(--layout-radius);
          margin: 1.5em 0;
          border: 1px solid var(--color-border-1000);
        }

        blockquote :global(*:first-child) {
          margin-top: 0;
        }

        blockquote :global(*:last-child) {
          margin-bottom: 0;
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
          --shine-angle: -45deg;
        }

        .shine-effect:hover:after {
          animation: shine-effect 1.2s ease;
        }

        .shine-effect:after {
          background: linear-gradient(
            to right,
            transparent 20%,
            transparent 40%,
            var(--color-background-600) 50%,
            var(--color-background-600) 55%,
            transparent 70%,
            transparent 100%
          );
          z-index: 2;
          position: absolute;
          border-radius: inherit;
          top: -1px;
          left: -1px;
          width: calc(100%);
          height: calc(100%);
          transform: scale(2) rotate(var(--shine-angle));
          opacity: 0.25;
          background-size: 200% auto;
          content: ' ';
        }

        @keyframes shine-effect {
          to {
            background-position: 200%;
            opacity: 0;
          }
        }
        @keyframes splide-loading {
          0% {
            transform: rotate(0);
          }
          to {
            transform: rotate(1turn);
          }
        }

        .scroll {
          &::-webkit-scrollbar {
            width: var(--layout-page-scroll-width, ${layout.pageScrollWidth});
            height: var(--layout-page-scroll-height, ${layout.pageScrollHeight});
            background: transparent;
          }

          &::-webkit-scrollbar-track {
            border-radius: var(--layout-page-scroll-radius);
            cursor: pointer;
            background: var(--color-background-600, ${theme.palette.background.hex_600});
          }

          &::-webkit-scrollbar-thumb {
            border-radius: var(--layout-page-scroll-radius);
            background: var(--color-background-400, ${theme.palette.background.hex_400});
          }

          &::-webkit-scrollbar-corner,
          &::-webkit-resizer {
            background: transparent;
            border: 0px solid transparent;
            width: 0;
            height: 0;
          }
        }

        .scroll-hover {
          &::-webkit-scrollbar,
          &::-webkit-scrollbar-track {
            background: transparent;
          }

          &:hover::-webkit-scrollbar-corner {
            background: transparent;
          }

          &:hover::-webkit-scrollbar-track {
            z-index: 9999;
          }

          &::-webkit-scrollbar-thumb {
            background: transparent;
          }

          &::-webkit-scrollbar-corner {
            background: transparent;
          }

          &::-webkit-scrollbar-resizer {
            background: transparent;
          }

          &:hover::-webkit-scrollbar-thumb {
            background: var(--color-background-400, ${theme.palette.background.hex_400});
          }

          &:hover::-webkit-resizer {
            background: var(--color-background-700);
          }
        }
      `}
    </style>
  );
};

export default CssBaseline;
