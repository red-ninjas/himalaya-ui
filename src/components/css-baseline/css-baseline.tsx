'use client';

import React from 'react';
import useLayout from '../use-layout';
import useTheme from '../use-theme';

const CssBaseline: React.FC = () => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <style jsx global>{`
      body {
        background-color: var(--color-background-1000);
        color: var(--color-foreground-1000);

        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;

        margin: 0;
        padding: 0;
        min-height: 100%;
        position: relative;
        overflow-x: hidden;
        font-family: ${theme.font.sans};
        font-size: ${theme.font.baseSize + 'px'};

        --ui-icon-background: var(--color-background-1000);
        --ui-icon-foreground: var(--color-foreground-1000);
      }

      *,
      *:before,
      *:after {
        box-sizing: inherit;
        text-rendering: optimizeLegibility;
        -webkit-tap-highlight-color: transparent;
      }

      p,
      small {
        color: inherit;
        font-family: ${theme.font.sans};
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
        color: ${theme.palette.code.hex_1000};
        font-family: ${theme.font.mono};
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
        font-family: ${theme.font.mono};
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
    `}</style>
  );
};

export default CssBaseline;
