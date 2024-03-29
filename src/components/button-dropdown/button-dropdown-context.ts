'use client';

import React from 'react';
import { UIColorTypes } from '../themes/presets';

export interface ButtonDropdownConfig {
  type?: UIColorTypes;
  auto?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const defaultContext = {
  type: 'default' as UIColorTypes,
  auto: false,
  disabled: false,
  loading: false,
};

export const ButtonDropdownContext = React.createContext<ButtonDropdownConfig>(defaultContext);

export const useButtonDropdown = (): ButtonDropdownConfig => React.useContext<ButtonDropdownConfig>(ButtonDropdownContext);
