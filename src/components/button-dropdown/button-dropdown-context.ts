'use client';

import React from 'react';
import { COLOR_TYPES } from '../utils/prop-types';

export interface ButtonDropdownConfig {
  type?: COLOR_TYPES;
  auto?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const defaultContext = {
  type: 'default' as COLOR_TYPES,
  auto: false,
  disabled: false,
  loading: false,
};

export const ButtonDropdownContext = React.createContext<ButtonDropdownConfig>(defaultContext);

export const useButtonDropdown = (): ButtonDropdownConfig => React.useContext<ButtonDropdownConfig>(ButtonDropdownContext);
