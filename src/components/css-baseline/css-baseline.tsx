'use client';

import React from 'react';
import useLayout from '../use-layout';
import useTheme from '../use-theme';

const CssBaseline: React.FC = () => {
  const theme = useTheme();
  const layout = useLayout();

  return (
    <style jsx global>{`
      html,
      body {
        background-color: ${theme.palette.background};
        color: ${theme.palette.foreground};

        --develop-start-gradient: oklch(59.59% 0.24 255.09156059071347);
        --develop-end-gradient: oklch(81.58% 0.189 190.74037768509325);
        --develop-line-end: oklch(65.84% 0.203 242.5318349103755);
        --develop-text: oklch(57.49% 0.249 257.84);
        --preview-start-gradient: oklch(49.07% 0.272 300.45);
        --preview-end-gradient: oklch(64.53% 0.292 2.47);
        --preview-line-end: oklch(51.39% 0.267 318.36);
        --preview-text: oklch(59.93% 0.274 352.55);
        --ship-start-gradient: oklch(67.3% 0.266 25.039656026515278);
        --ship-end-gradient: oklch(85.82% 0.201 91.19);
        --ship-line-end: oklch(85.82% 0.201 91.19);
        --ship-text: oklch(68.79% 0.25 27.76);
      }

      html {
        --ui-icon-background: ${theme.palette.background};
        --ui-icon-foreground: ${theme.palette.foreground};

        font-size: ${theme.font.baseSize + 'px'};
      }

      body {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;

        margin: 0;
        padding: 0;
        min-height: 100%;
        position: relative;
        overflow-x: hidden;
        font-family: ${theme.font.sans};
        font-size: 1rem;
      }

      #__next {
        overflow-x: hidden;
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
        font-weight: 400;
        color: inherit;
        letter-spacing: -0.005625em;
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
      }

      a:hover {
        text-decoration: ${theme.expressiveness.linkHoverStyle};
      }

      ul,
      ol {
        padding: 0;
        list-style-type: none;
        margin: ${layout.gapHalf} ${layout.gapHalf} ${layout.gapHalf} ${layout.gap};
        color: ${theme.palette.foreground};
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
        color: ${theme.palette.accents_4};
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
        font-size: 2.5rem;
        line-height: 3.5rem;
        letter-spacing: -0.058125rem;
        font-weight: 600;
      }

      h2 {
        font-size: 2rem;
        line-height: 2.5rem;
        letter-spacing: -0.049375rem;
        font-weight: 600;
      }

      h3 {
        font-size: 1.5rem;
        line-height: 2rem;
        letter-spacing: -0.029375rem;
        font-weight: 600;
      }

      h4 {
        font-size: 1.25rem;
        line-height: 1.5rem;
        letter-spacing: -0.020625rem;
        font-weight: 600;
      }

      h5 {
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: 600;
      }

      h6 {
        font-size: 0.87rem;
        line-height: 1.25rem;
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
        color: ${theme.palette.code};
        font-family: ${theme.font.mono};
        font-size: 0.9em;
        white-space: pre-wrap;
      }

      code:before,
      code:after {
        content: '\`';
      }

      pre {
        padding: calc(${layout.gap} * 0.9) ${layout.gap};
        margin: ${layout.gap} 0;
        border: 1px solid ${theme.palette.border};
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
        color: ${theme.palette.foreground};
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
        border-color: ${theme.palette.border};
      }

      details {
        background-color: ${theme.palette.accents_1};
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
        color: ${theme.palette.accents_5};
        background-color: ${theme.palette.accents_0};
        border-radius: ${theme.style.radius};
        margin: 1.5em 0;
        border: 1px solid ${theme.palette.border};
      }

      blockquote :global(*:first-child) {
        margin-top: 0;
      }

      blockquote :global(*:last-child) {
        margin-bottom: 0;
      }

      ::selection {
        background-color: ${theme.palette.selection};
        color: ${theme.palette.foreground};
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
          ${theme.palette.accents_3} 50%,
          ${theme.palette.accents_3} 55%,
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
