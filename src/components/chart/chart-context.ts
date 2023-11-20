'use client';

import React from 'react';
import { IChartApi } from '../use-charts/api/create-chart';
import { LegendDictonary } from './shared';

export interface ChartConfig {
  chart: IChartApi | undefined;
  legends: LegendDictonary;
}

const defaultContext = {
  chart: undefined,
  legends: {},
};

export const ChartContext = React.createContext<ChartConfig>(defaultContext);
export const useChart = (): ChartConfig => React.useContext<ChartConfig>(ChartContext);
