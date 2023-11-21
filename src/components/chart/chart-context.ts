'use client';

import React from 'react';
import { IChartApi } from '../use-charts/api/create-chart';

export interface ChartConfig {
  chart: IChartApi | undefined;
}

const defaultContext = {
  chart: undefined,
};

export const ChartContext = React.createContext<ChartConfig>(defaultContext);
export const useChart = (): ChartConfig => React.useContext<ChartConfig>(ChartContext);
