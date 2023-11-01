'use client';

import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';
import { UIThemesPalette } from '../themes/presets';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

export type LoadingSpinnerTypes = NormalTypes;
interface Props {
  type?: LoadingSpinnerTypes;
  color?: string;
  className?: string;
  spaceRatio?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type LoadingSpinnerProps = Props & NativeAttrs;

const getIconBgColor = (type: LoadingSpinnerTypes, palette: UIThemesPalette, color?: string) => {
  const colors: { [key in LoadingSpinnerTypes]: string } = {
    default: palette.accents_6,
    secondary: palette.secondary.value,
    primary: palette.primary.value,
    tertiary: palette.tertiary.value,
    success: palette.success.value,
    warning: palette.warning.value,
    error: palette.error.value,
  };

  return color ? color : colors[type];
};

const LoadingSpinnerComponent: React.FC<React.PropsWithChildren<LoadingSpinnerProps>> = ({
  children,
  type = 'default' as LoadingSpinnerTypes,
  color,
  className = '',
  spaceRatio = 1,
  ...props
}: React.PropsWithChildren<LoadingSpinnerProps>) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const classes = useClasses('loading-container', className);
  const bgColor = useMemo(() => getIconBgColor(type, theme.palette, color), [type, theme.palette, color]);

  return (
    <div className={classes} {...props}>
      <span className="loading">
        {children && <label>{children}</label>}
        <i />
        <i />
        <i />
      </span>
      <style jsx>{`
        .loading-container {
          display: inline-flex;
          align-items: center;
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, '100%')};
          min-height: 1em;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
        }

        label {
          margin-right: 0.5em;
          color: ${theme.palette.accents_5};
          line-height: 1;
        }

        label :global(*) {
          margin: 0;
        }

        .loading {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          user-select: none;
        }

        i {
          width: 0.25em;
          height: 0.25em;
          border-radius: 50%;
          background-color: ${bgColor};
          margin: 0 calc(0.25em / 2 * ${spaceRatio});
          display: inline-block;
          animation: loading-blink 1.4s infinite both;
        }

        i:nth-child(2) {
          animation-delay: 0.2s;
        }

        i:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes loading-blink {
          0% {
            opacity: 0.2;
          }

          20% {
            opacity: 1;
          }

          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

LoadingSpinnerComponent.displayName = 'HimalayaLoadingSpinner';
const LoadingSpinner = withScale(LoadingSpinnerComponent);
export default LoadingSpinner;
