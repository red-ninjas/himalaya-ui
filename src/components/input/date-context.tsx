'use client';
import React, { MutableRefObject } from 'react';
import { ViewModeType } from './shared';

export interface InputDateConfig {
  value?: string;
  viewMode: ViewModeType;
  updateValue?: (val: string) => unknown;
  visible?: boolean;
  updateVisible?: (next: boolean) => unknown;
  ref?: MutableRefObject<HTMLElement | null>;
}

const defaultContext: InputDateConfig = {
  visible: false,
  viewMode: 'DAYS',
};

export const InputDateContext = React.createContext<InputDateConfig>(defaultContext);
export const useInputDateContext = (): InputDateConfig => React.useContext<InputDateConfig>(InputDateContext);
