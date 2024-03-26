import { NormalTypes } from '../utils/prop-types';

export type SelectColor = {
  bg: string;
};

export const getColors = (status?: NormalTypes): SelectColor => {
  const colors: { [key in NormalTypes]: SelectColor } = {
    default: {
      bg: 'var(--color-foreground-1000)',
    },
    secondary: {
      bg: 'var(--color-secondary-1000)',
    },
    success: {
      bg: 'var(--color-success-1000)',
    },
    warning: {
      bg: 'var(--color-warning-1000)',
    },
    error: {
      bg: 'var(--color-error-1000)',
    },
    primary: {
      bg: 'var(--color-primary-1000)',
    },
    tertiary: {
      bg: 'var(--color-tertiary-1000)',
    },
  };

  if (!status) return colors.default;
  return colors[status];
};
