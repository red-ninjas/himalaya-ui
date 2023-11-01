'use client';

import React, { useMemo } from 'react';
import useTheme from '../use-theme';
import { ButtonTypes } from '../utils/prop-types';
import { ButtonGroupContext, ButtonGroupConfig } from './button-group-context';
import { UIThemesPalette } from '../themes/presets';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  ghost?: boolean;
  type?: ButtonTypes;
  className?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type ButtonGroupProps = Props & NativeAttrs;

const getGroupBorderColors = (palette: UIThemesPalette, type = 'default' as ButtonTypes, disabled = false): string => {
  if (disabled) {
    return palette.border;
  }
  const colors: { [key in ButtonTypes]?: string } = {
    primary: palette.primary.darker,
    tertiary: palette.tertiary.darker,
    default: palette.accents_7,
    success: palette.success.darker,
    secondary: palette.secondary.darker,
    error: palette.error.darker,
    warning: palette.warning.darker,
    abort: palette.border,
  };
  return colors[type] as string;
};

const ButtonGroupComponent: React.FC<React.PropsWithChildren<ButtonGroupProps>> = (groupProps: ButtonGroupProps) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { disabled = false, type = 'default' as ButtonTypes, ghost = false, vertical = false, children, className = '', ...props } = groupProps;
  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      type,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, type],
  );
  const border = useMemo(() => {
    return getGroupBorderColors(theme.palette, type, disabled);
  }, [theme, type, disabled]);
  const classes = useClasses(
    'btn-group',
    {
      vertical: vertical,
      horizontal: !vertical,
    },
    className,
  );

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={classes} {...props}>
        {children}
        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border-radius: ${theme.style.radius};
            border: 1px solid ${border};
            background-color: transparent;
            overflow: hidden;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'min-content')};
            margin: ${SCALES.mt(0.313)} ${SCALES.mr(0.313)} ${SCALES.mb(0.313)} ${SCALES.ml(0.313)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
          }
          .vertical {
            flex-direction: column;
          }
          .btn-group :global(.btn) {
            border: none;
          }
          .btn-group :global(.btn .text) {
            top: 0;
          }
          .horizontal :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid ${border};
          }
          .horizontal :global(.btn:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid ${border};
          }
          .vertical :global(.btn:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  );
};

ButtonGroupComponent.displayName = 'HimalayaButtonGroup';
const ButtonGroup = withScale(ButtonGroupComponent);
export default ButtonGroup;
