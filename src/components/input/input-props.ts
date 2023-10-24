import React from 'react';
import { NormalTypes } from '../utils/prop-types';

export type InputTypes = NormalTypes;
export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: InputTypes;
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
}
