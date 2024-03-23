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
        background-color: ${theme.palette.background.value};
        color: ${theme.palette.foreground.value};

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

        --ui-icon-background: ${theme.palette.background.value};
        --ui-icon-foreground: ${theme.palette.foreground.value};
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
        color: ${theme.palette.link.value};
        text-decoration: ${theme.expressiveness.linkStyle};

        &:hover {
          text-decoration: ${theme.expressiveness.linkHoverStyle};
        }
      }

      ul,
      ol {
        padding: 0;
        list-style-type: none;
        margin: ${layout.gapHalf} ${layout.gapHalf} ${layout.gapHalf} ${layout.gap};
        color: ${theme.palette.foreground.value};
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
        color: ${theme.palette.background.accents_4};
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
        color: ${theme.palette.code.value};
        background-color: ${theme.palette.codeBg.value};
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
        padding: calc(${layout.gap} * 0.9) ${layout.gap};
        margin: ${layout.gap} 0;
        border: 1px solid ${theme.palette.border.value};
        border-radius: ${theme.style.radius};
        font-family: ${theme.font.mono};
        white-space: pre;
        overflow: auto;
        line-height: 1.5;
        text-align: left;
        font-size: 14px;
        -webkit-overflow-scrolling: touch;
      }

      pre code {
        color: ${theme.palette.primary.value};
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
        border-color: ${theme.palette.border.value};
      }

      details {
        background-color: ${theme.palette.background.accents_1};
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
        padding: calc(0.667 * ${layout.gap}) ${layout.gap};
        color: ${theme.palette.background.accents_5};
        background-color: ${theme.palette.background.accents_0};
        border-radius: ${theme.style.radius};
        margin: 1.5em 0;
        border: 1px solid ${theme.palette.border.value};
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
          ${theme.palette.background.accents_3} 50%,
          ${theme.palette.background.accents_3} 55%,
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
