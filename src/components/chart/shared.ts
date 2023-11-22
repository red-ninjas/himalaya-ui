import moment from 'moment';
import { LineType } from '../use-charts';
import { TickMarkFormatter } from '../use-charts/model/horz-scale-behavior-time/horz-scale-behavior-time';
import { Time } from '../use-charts/model/horz-scale-behavior-time/types';
import { TimeFormatterFn } from '../use-charts/model/localization-options';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { SeriesPartialOptionsMap, SeriesType } from '../use-charts/model/series-options';

export type ThemedChartPriceFormatter = (value: number) => string;

export interface ThemedChartDataRecord {
  time: number;
  value: number;
}

export interface ThemedChartDataCandleRecord {
  time: number;
  value: number;
  low: number;
  open: number;
  high: number;
}
export type ChartTypes = 'line' | 'area' | 'bar' | 'candle';
export type ChartSide = 'left' | 'right';

export interface ThemedChartData {
  data: ThemedChartDataRecord[];
  type: ChartTypes;
  side?: ChartSide;
  showTitle?: boolean;

  visible?: boolean;
  color: string;
  priceLineVisible?: boolean;
  lastValueVisible?: boolean;
  priceFormatter?: ThemedChartPriceFormatter;
}
export interface ChartSerie {
  data: Array<ThemedChartDataRecord> | Array<ThemedChartDataCandleRecord>;
  side?: ChartSide;
  showTitle?: boolean;
  title: string;
  visible?: boolean;
  color: string;
  priceLineVisible?: boolean;
  lastValueVisible?: boolean;
  priceFormatter?: ThemedChartPriceFormatter;
  onOptionsChanged?: (data: SeriesPartialOptionsMap[SeriesType]) => void;
}
export interface ILegendVisibleStates {
  title?: string;
  key: string;
  visible?: boolean;
}

export type LegendDictonary = Array<ISeriesApi<SeriesType>>;
export type ILegendStatesDictonary = Array<ILegendVisibleStates>;

interface ChartProperties {
  height?: number;
  showTime?: boolean;
  showBottomHover?: boolean;
  showPopover?: boolean;
  showSeconds?: boolean;
  timeFormatter?: TimeFormatterFn;
  tickFormatter?: TickMarkFormatter;
  hasSides?: 'right' | 'left' | 'both';
}

type NativeChartAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof ChartProperties>;
export type ChartProps = ChartProperties & NativeChartAttrs;

export interface ChartLineProp extends ChartSerie {
  data: Array<ThemedChartDataRecord>;
  type: 'line';
  lineType?: LineType;
}

export interface ChartAreaProp extends ChartSerie {
  data: Array<ThemedChartDataRecord>;
  type: 'area';
  lineType?: LineType;
}

export interface ChartBarProp extends ChartSerie {
  data: Array<ThemedChartDataRecord>;
  type: 'bar';
}

export interface ChartCandleProp extends ChartSerie {
  data: Array<ThemedChartDataCandleRecord>;
  type: 'candle';
}

export const DefaulFormatter = (timeInUTC: Time, format = 'dddd.MM.YYYY, HH:mm') => {
  return moment.unix(Number(timeInUTC) - moment().utcOffset() * 60).format(format);
};

export const DefaulTimeFormatter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'L LT (Z)');
};

export const DefaulHourFormatter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'L HH:mm');
};
export const DefaulDayFormatter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'L');
};

export const DateTimeFormatter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'dddd, HH:mm');
};
export const WeekdayFormatter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'dddd');
};

export const YearAndMonthConverter = (timeInUTC: Time) => {
  return DefaulFormatter(timeInUTC, 'MM, YYYY');
};

export const ChartPriceFormatter = (value: number) => {
  let locale = 'en-US';
  if (typeof window != 'undefined') {
    locale = window.navigator.languages[0] || 'en-US';
  }

  return Intl.NumberFormat(locale, {
    style: 'currency',
    notation: 'compact',
    compactDisplay: 'short',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    currencyDisplay: 'code',
  }).format(value);
};

export const ChartMarketPriceFormatter = (value: number, currency = 'USD') => {
  let locale = 'en-US';
  if (typeof window != 'undefined') {
    locale = window.navigator.languages[0] || 'en-US';
  }

  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(value);
};

export const ChartPercentFormatter = (value: number) => {
  let locale = 'en-US';
  if (typeof window != 'undefined') {
    locale = window.navigator.languages[0] || 'en-US';
  }

  return Intl.NumberFormat(locale, {
    style: 'percent',
    notation: 'compact',
    maximumSignificantDigits: 2,
  }).format(value / 100);
};

export const ChartNumberFormatter = (value: number) => {
  let locale = 'en-US';
  if (typeof window != 'undefined') {
    locale = window.navigator.languages[0] || 'en-US';
  }

  return Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumSignificantDigits: 5,
  }).format(value);
};
