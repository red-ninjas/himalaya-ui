'use client';

import React from 'react';
import { IChartApi } from '../use-charts/api/create-chart';
import { ILegendStatesDictonary } from './shared';

export interface ChartConfig {
  chart: IChartApi | undefined;
  series: ILegendStatesDictonary;
}

const defaultContext = {
  chart: undefined,
  series: [],
};

export const ChartContext = React.createContext<ChartConfig>(defaultContext);
export const useChart = (): ChartConfig => React.useContext<ChartConfig>(ChartContext);
