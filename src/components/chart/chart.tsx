'use client';

import Checkbox from '../checkbox';
import Note from '../note';
import { UIThemes } from '../themes';

import { ColorType, LineType, createChart } from '../use-charts';

import moment from 'moment';
import React, { createRef } from 'react';
import { hexToRgb } from '../utils/color';
import { Time, UTCTimestamp } from 'components/use-charts/model/horz-scale-behavior-time/types';
import { TimeFormatterFn } from 'components/use-charts/model/localization-options';
import { TickMarkFormatter } from 'components/use-charts/model/horz-scale-behavior-time/horz-scale-behavior-time';
import { ISeriesApi } from 'components/use-charts/api/iseries-api';
import { PriceFormatCustom, SeriesOptionsMap } from 'components/use-charts/model/series-options';
import { ChartOptions, IChartApi } from 'components/use-charts/api/create-chart';
import { DeepPartial } from 'components/utils/types';
import { withThemeContext } from '../use-theme';

interface ThemedChartItem {
  time: number;
  value: number;
  low?: number;
  open?: number;
  high?: number;
}

export type ThemedChartPriceFormatter = (value: number) => string;
export interface ThemedChartData {
  data: ThemedChartItem[];
  type: 'line' | 'area' | 'bar' | 'candle';
  side?: 'left' | 'right';
  showTitle?: boolean;
  visible?: boolean;
  color: string;
  priceLineVisible?: boolean;
  lastValueVisible?: boolean;
  priceFormatter?: ThemedChartPriceFormatter;
}
const toolTipWidth = 80;
const toolTipHeight = 80;
const toolTipMargin = 15;

export const DefaulTimeFormatter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('L LT (Z)');
};

export const DefaulHourFormatter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('L HH:mm');
};
export const DefaulDayFormatter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('L');
};

export const DateTimeFormatter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('dddd, HH:mm');
};
export const WeekdayFormatter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('dddd');
};

export const YearAndMonthConverter = (businessDayOrTimestamp: Time) => {
  return moment.unix(Number(businessDayOrTimestamp) - moment().utcOffset() * 60).format('MM, YYYY');
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

export interface ChartProps {
  series: { [name: string]: ThemedChartData };
  // theme?: UIThemes;
  context?: UIThemes;
  showLegends?: boolean;
  showTime?: boolean;
  showSeconds?: boolean;
  timeFormatter?: TimeFormatterFn;
  tickFormatter?: TickMarkFormatter;
}
export interface ThemeChartSeriesDictonary {
  [name: string]: ISeriesApi<keyof SeriesOptionsMap>;
}
interface ThemedChartStates {
  series: ThemeChartSeriesDictonary;
  activeSeries: string[];
  isEmpty: boolean;
}

class ThemedChart extends React.Component<ChartProps> {
  chart: IChartApi | undefined = undefined;
  chartContainerRef = createRef<HTMLDivElement>();
  tooltipRef = createRef<HTMLDivElement>();

  override state: ThemedChartStates = { series: {}, activeSeries: [], isEmpty: false };

  constructor(props: any) {
    super(props);
  }

  private options: DeepPartial<ChartOptions> = {
    layout: {
      background: { type: ColorType.Solid, color: 'transparent' },
    },
    timeScale: {
      timeVisible: this.props.showTime,
      secondsVisible: this.props.showSeconds,
      tickMarkFormatter: this.props.tickFormatter,

      fixLeftEdge: true,
      fixRightEdge: true,
      borderColor: 'rgba(0,0,0,0.0)',
    },
    rightPriceScale: {
      borderColor: 'rgba(0,0,0,0.0)',
      visible: false,
    },
    leftPriceScale: {
      borderColor: 'rgba(0,0,0,0.0)',
      visible: false,
    },
    grid: {
      vertLines: {
        visible: true,
      },
      horzLines: {
        visible: true,
      },
    },
    localization: {
      timeFormatter: this.props.timeFormatter ? this.props.timeFormatter : DefaulTimeFormatter,
    },
  };

  protected addSerie(name: string, serie: ISeriesApi<keyof SeriesOptionsMap>) {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.series[name] = serie;
    this.setState(this.state);
  }

  protected removeSerie(name: string) {
    delete this.state.series[name];
    this.setState(this.state);
  }

  protected clearSeries() {
    for (const key of Object.keys(this.state.series)) {
      delete this.state.series[key];
    }

    this.setState(this.state);
  }

  configure(options: DeepPartial<ChartOptions>): DeepPartial<ChartOptions> {
    return options;
  }

  override componentDidMount(): void {
    if (!this.chartContainerRef.current) {
      return;
    }
    this.options.width = this.chartContainerRef.current.clientWidth;
    this.options.height = 350;
    this.chart?.remove();
    this.chart = createChart(this.chartContainerRef.current, this.configure(this.options));
    this.chart.subscribeCrosshairMove(param => {
      const container = this.chartContainerRef.current;
      const toolTip = this.tooltipRef.current;

      if (!toolTip || !container) {
        return;
      }

      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > container.clientWidth ||
        param.point.y < 0 ||
        param.point.y > container.clientHeight
      ) {
        toolTip.style.display = 'none';
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        toolTip.style.display = 'block';
        //const data = param.seriesData.get(series);

        const formatter = this.props.timeFormatter || DefaulTimeFormatter;
        let tooltip = `<div class="tooltip-graph-time">${formatter(param.time)}</div>`;
        for (const key of Object.keys(this.state.series)) {
          const serie = this.state.series[key];
          const data: any = param.seriesData.get(serie);
          const price = data && data['value'] !== undefined ? data['value'] : data ? data['close'] : '';
          const fmt = serie.options().priceFormat as PriceFormatCustom;
          const formatter = fmt.formatter;
          const priceFormatted = formatter ? formatter(price) : ChartPriceFormatter(price);

          tooltip += `<div class="tooltip-graph-element"><div class="tooltip-graph-key">${key}</div><div style="color:${
            serie.options().baseLineColor
          }" class="tooltip-graph-value">${priceFormatted}</div></div>`;
        }

        toolTip.innerHTML = tooltip;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > container.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > container.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + 'px';
        toolTip.style.top = top + 'px';
      }
    });
    window.addEventListener('resize', this.handleResize.bind(this));
    this.setTheme();
    this.generateData();
  }

  override componentDidUpdate(prevProps: Readonly<ChartProps>): void {
    if (prevProps.context?.type !== this.props.context?.type) {
      this.setTheme();
    }

    if (Object.keys(prevProps.series) === Object.keys(this.props.series)) {
      this.generateData();
    }

    if (prevProps.timeFormatter === this.props.timeFormatter) {
      this.chart?.applyOptions({
        localization: {
          timeFormatter: this.props.timeFormatter || DefaulTimeFormatter,
        },
      });
    }
  }

  private setTheme() {
    this.chart?.applyOptions({
      layout: {
        textColor: this.props.context?.type == 'dark' ? '#fff' : '#000',
      },
      grid: {
        vertLines: {
          color: this.props.context?.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        },
        horzLines: {
          color: this.props.context?.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        },
      },
    });
  }

  checkSides() {
    let hastLeftSide = false;
    let hasRightSide = false;

    for (const key of Object.keys(this.props.series)) {
      if (this.props.series[key] && this.state.series[key].options().visible) {
        const side = this.props.series[key].side || 'right';
        if (side == 'right') {
          hasRightSide = true;
        } else if (side == 'left') {
          hastLeftSide = true;
        }
      }
    }

    this.chart?.applyOptions({
      rightPriceScale: {
        borderColor: 'rgba(0,0,0,0.0)',
        visible: hasRightSide,
      },
      leftPriceScale: {
        borderColor: 'rgba(0,0,0,0.0)',
        visible: hastLeftSide,
      },
    });
  }

  renderData() {
    if (!this.chart) {
      return;
    }

    for (const key of Object.keys(this.props.series)) {
      const defaultColor = this.props.series[key].color || this.props.context?.palette.success || '#eee';

      if (this.props.series[key].type == 'area') {
        const side = this.props.series[key].side || 'right';
        const area = this.chart.addAreaSeries({
          title: this.props.series[key].showTitle ? key : undefined,
          visible: this.props.series[key].visible,
          lineColor: defaultColor,
          lineWidth: 2,
          priceScaleId: side,
          priceLineVisible: this.props.series[key].priceLineVisible || false,
          lastValueVisible: this.props.series[key].lastValueVisible || false,
          lineType: LineType.Curved,
          topColor: `rgba(${hexToRgb(defaultColor)}, 0.6)`,
          bottomColor: `rgba(${hexToRgb(defaultColor)}, 0.2)`,
          priceFormat: {
            type: 'custom',
            formatter: this.props.series[key].priceFormatter ? this.props.series[key].priceFormatter : ChartPriceFormatter,
          },
        });

        area.setData(
          this.props.series[key].data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              value: df.value,
            };
          }),
        );

        this.addSerie(key, area);
      } else if (this.props.series[key].type == 'line') {
        const side = this.props.series[key].side || 'right';
        const line = this.chart.addLineSeries({
          title: this.props.series[key].showTitle ? key : undefined,
          visible: this.props.series[key].visible,
          color: defaultColor,
          lineWidth: 2,
          priceScaleId: side,
          priceLineVisible: this.props.series[key].priceLineVisible || false,
          lastValueVisible: this.props.series[key].lastValueVisible || false,
          lineType: LineType.Curved,
          priceFormat: {
            type: 'custom',
            formatter: this.props.series[key].priceFormatter ? this.props.series[key].priceFormatter : ChartPriceFormatter,
          },
        });

        line.setData(
          this.props.series[key].data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              value: df.value,
            };
          }),
        );

        this.addSerie(key, line);
      } else if (this.props.series[key].type == 'bar') {
        const side = this.props.series[key].side || 'right';
        const bar = this.chart.addHistogramSeries({
          title: this.props.series[key].showTitle ? key : undefined,
          visible: this.props.series[key].visible,
          color: defaultColor,
          priceScaleId: side,
          priceLineVisible: this.props.series[key].priceLineVisible || false,
          lastValueVisible: this.props.series[key].lastValueVisible || false,
          priceFormat: {
            type: 'custom',
            formatter: this.props.series[key].priceFormatter ? this.props.series[key].priceFormatter : ChartPriceFormatter,
          },
        });

        bar.setData(
          this.props.series[key].data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              value: df.value,
            };
          }),
        );

        this.addSerie(key, bar);
      } else if (this.props.series[key].type == 'candle') {
        const side = this.props.series[key].side || 'right';
        const candle = this.chart.addCandlestickSeries({
          title: this.props.series[key].showTitle ? key : undefined,
          visible: this.props.series[key].visible,
          priceScaleId: side,
          priceLineVisible: this.props.series[key].priceLineVisible || false,
          lastValueVisible: this.props.series[key].lastValueVisible || false,
          priceFormat: {
            type: 'custom',
            formatter: this.props.series[key].priceFormatter ? this.props.series[key].priceFormatter : ChartPriceFormatter,
          },
        });

        candle.setData(
          this.props.series[key].data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              close: df.value,
              low: df.low,
              open: df.open,
              high: df.high,
            };
          }),
        );

        this.addSerie(key, candle);
      }
    }

    this.chart.timeScale().fitContent();
    this.checkSides();
  }

  private generateData() {
    if (this.chart) {
      this.clearSeries();
      this.renderData();
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.activeSeries = this.getActiveSeries();
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.isEmpty = !this.isNotEmpty();
      this.setState(this.state);
    }
  }

  getActiveSeries(): string[] {
    const actives: string[] = [];
    for (const i of Object.keys(this.state.series)) {
      if (this.state.series[i].options().visible) actives.push(i);
    }

    return actives;
  }

  override componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleResize);
  }

  private handleResize() {
    if (!this.chartContainerRef.current) {
      return;
    }
    this.chart?.applyOptions({ width: this.chartContainerRef.current.clientWidth });
  }

  private isNotEmpty() {
    for (const i of Object.keys(this.props.series)) {
      if (this.props.series[i].data && this.props.series[i].data.length > 0) {
        return true;
      }
    }

    return false;
  }

  override render() {
    const makeVisible = (key: any) => {
      let keys: string[] = [];
      if (Array.isArray(key)) {
        keys = key;
      } else {
        keys = [key];
      }

      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.activeSeries = keys;

      for (const serieKey of Object.keys(this.state.series)) {
        this.state.series[serieKey].applyOptions({
          visible: this.state.activeSeries.includes(serieKey),
        });
      }

      this.setState({ activeSeries: this.state.activeSeries });
      this.checkSides();
    };

    return (
      <>
        {!this.state.isEmpty ? (
          <div className="chart-container">
            <div ref={this.chartContainerRef}></div>
            <div className="graph-tooltip" ref={this.tooltipRef}></div>

            {this.props.showLegends && (
              <Checkbox.Group scale={0.75} className="legends" value={this.state.activeSeries} onChange={value => makeVisible(value)}>
                {Object.keys(this.state.series).map(i => (
                  <Checkbox key={i} className="series-checkbox" value={i}>
                    {i}
                  </Checkbox>
                ))}
              </Checkbox.Group>
            )}
          </div>
        ) : (
          <Note>No graph datas found. </Note>
        )}
        <style jsx>{`
          .chart-container {
            position: relative;
          }
          .graph-tooltip {
            position: absolute;
            display: none;
            padding: 8px;
            box-sizing: border-box;
            font-size: 12px;
            text-align: left;
            z-index: 1000;
            top: 12px;
            left: 12px;
            pointer-events: none;
            border: 1px solid;
            border-color: ${this.props.context?.palette.border};
            border-radius: 6px;
            font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            color: ${this.props.context?.palette.foreground};
            background: ${this.props.context?.palette.background};
            font-size: calc(1 * 12px);
            padding: calc(0.65 * 12px) calc(0.9 * 12px) calc(0.65 * 12px) calc(0.9 * 12px);
          }
          :global(.tooltip-graph-element) {
            display: flex;
            flex-wrap: no-wrap;
            gap: 6px;
          }
          .legends {
            margin-top: 12px;
          }
          :global(.series-checkbox .text) {
            color: ${this.props.context?.palette.accents_5};
          }
        `}</style>
      </>
    );
  }
}

export default withThemeContext(ThemedChart);
