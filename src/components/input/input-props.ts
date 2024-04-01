import React from 'react';
import { UIColorTypes } from '../themes/presets';

/**
 * Internal input props
 */
export type InputInternalProps = {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: UIColorTypes;
  htmlType?: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  labelRight?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconClickable?: boolean;
  className?: string;
  clearable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onIconClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  autoComplete?: string;
  hasBorder?: boolean;
};
