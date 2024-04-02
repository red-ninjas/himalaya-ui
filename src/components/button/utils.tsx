'use client';

import React, { ReactNode } from 'react';
import { ButtonGroupConfig } from '../button-group/button-group-context';
import useClasses from '../use-classes';
import { UIThemesBreakpoints } from '../use-config/shared';
import { ScaleResponsiveParameter, customResponsiveAttribute } from '../use-scale';
import { ButtonProps } from './button';
import ButtonIcon from './button-icon';

export const getButtonChildrenWithIcon = (
  breakpoints: UIThemesBreakpoints,
  auto: ScaleResponsiveParameter<boolean>,
  children: ReactNode,
  icons: {
    icon?: React.ReactNode;
    iconRight?: React.ReactNode;
  },
) => {
  const { icon, iconRight } = icons;

  const hasIcon = icon || iconRight;
  const isRight = Boolean(iconRight);
  const classes = useClasses('text', isRight ? 'right' : 'left');

  if (!hasIcon) return <div className="text">{children}</div>;
  if (React.Children.count(children) === 0) {
    return (
      <ButtonIcon isRight={isRight} isSingle>
        {hasIcon}
      </ButtonIcon>
    );
  }
  return (
    <>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={classes}>
        {children}
        <style jsx>{`
          ${customResponsiveAttribute(
            auto,
            'right',
            breakpoints,
            value => `padding-right: ${value ? `calc(var(--ui-button-height) / 2 + var(--ui-button-icon-padding) * .5)` : 0};`,
          )}

          ${customResponsiveAttribute(
            auto,
            'left',
            breakpoints,
            value => `padding-left: ${value ? `calc(var(--ui-button-height) / 2 + var(--ui-button-icon-padding) * .5)` : 0};`,
          )}
        `}</style>
      </div>
    </>
  );
};

export const filterPropsWithGroup = <T extends React.PropsWithChildren<ButtonProps>>(props: T, config: ButtonGroupConfig): T => {
  if (!config.isButtonGroup) return props;
  return {
    ...props,
    auto: true,
    shadow: false,
    ghost: config.ghost || props.ghost,
    type: config.type || props.type,
    disabled: config.disabled || props.disabled,
  };
};
