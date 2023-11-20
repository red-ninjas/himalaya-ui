'use client';

import { ColorType, createChart } from '../use-charts';

import React, { Children, createRef, useEffect, useState } from 'react';
import { ChartOptions, IChartApi } from '../use-charts/api/create-chart';
import { MouseEventHandler } from '../use-charts/api/ichart-api';
import { Time } from '../use-charts/model/horz-scale-behavior-time/types';
import { PriceFormatCustom } from '../use-charts/model/series-options';
import useTheme from '../use-theme';
import { DeepPartial } from '../utils/types';
import { ChartConfig, ChartContext } from './chart-context';
import { ChartPriceFormatter, ChartProps, DefaulTimeFormatter, ILegend, LegendDictonary } from './shared';
import { getValidChildren, pickChild, pickChildByProps } from 'components/utils/collections';
import ChartLine from './chart-line';
import ChartArea from './chart-area';
import ChartBar from './chart-bar';
import ChartCandle from './chart-candle';

const toolTipWidth = 80;
const toolTipHeight = 80;
const toolTipMargin = 15;

/*
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
    this.options.height = this.getHeight();
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
    if (prevProps.height !== this.props.height) {
      this.setHeight(this.props.height || defaultChartHeight);
    }

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

  private setHeight(height: number) {
    this.chart?.applyOptions({
      height,
    });
  }
  private getHeight(): number {
    return this.props.height || defaultChartHeight;
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

*/

const useRefDimensions = (ref: React.RefObject<HTMLDivElement>) => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const resizeObserver = new ResizeObserver(() => {
      const boundingRect = ref?.current?.getBoundingClientRect();
      if (boundingRect != undefined) {
        const { width } = boundingRect;
        setWidth(width);
      }
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return width;
};

const Chart: React.FC<React.PropsWithChildren<ChartProps>> = ({
  children,
  height = 350,
  showPopover = true,
  showTime,
  showSeconds,
  hasSides = 'right',
  timeFormatter = DefaulTimeFormatter,
  tickFormatter,
}) => {
  const theme = useTheme();
  const chartContainerRef = createRef<HTMLDivElement>();
  const chartOuterContainerRef = createRef<HTMLDivElement>();
  const width = useRefDimensions(chartOuterContainerRef);

  const tooltipRef = createRef<HTMLDivElement>();
  const defaultOptions: DeepPartial<ChartOptions> = {
    layout: {
      background: { type: ColorType.Solid, color: 'transparent' },
      textColor: theme.palette.foreground,
    },
    height: height,
    timeScale: {
      timeVisible: showTime,
      secondsVisible: showSeconds,
      tickMarkFormatter: tickFormatter,
      fixLeftEdge: true,
      fixRightEdge: true,
      borderColor: 'rgba(0,0,0,0.0)',
    },
    rightPriceScale: {
      borderColor: 'rgba(0,0,0,0.0)',
      visible: hasSides == 'both' || hasSides == 'right',
    },
    leftPriceScale: {
      borderColor: 'rgba(0,0,0,0.0)',
      visible: hasSides == 'both' || hasSides == 'left',
    },
    grid: {
      vertLines: {
        color: theme.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        visible: true,
      },
      horzLines: {
        visible: true,
        color: theme.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
      },
    },

    localization: {
      timeFormatter: timeFormatter,
    },
  };

  const tooltipSubscriber: MouseEventHandler<Time> = param => {
    const container = chartContainerRef.current;
    const toolTip = tooltipRef.current;

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

      const formatter = timeFormatter;
      let tooltip = `<div class="tooltip-graph-time">${formatter(param.time)}</div>`;
      for (const [api, data] of param.seriesData) {
        const options = api.options();

        const price = data && data['value'] !== undefined ? data['value'] : data ? data['close'] : '';
        const color = data && data['color'] !== undefined ? data['color'] : data ? theme.palette.primary.value : '';

        const fmt = options.priceFormat as PriceFormatCustom;
        const formatter = fmt.formatter;
        const priceFormatted = formatter ? formatter(price) : ChartPriceFormatter(price);

        tooltip += `<div class="tooltip-graph-element"><div class="tooltip-graph-key">${options.title}</div><div style="color:${color}" class="tooltip-graph-value">${priceFormatted}</div></div>`;
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
  };

  const [options, setOptions] = useState<DeepPartial<ChartOptions>>(defaultOptions);
  const [chart, setChart] = useState<IChartApi>();
  const [legends, setLegends] = useState<LegendDictonary>({});

  const arrayChildren = Children.toArray(children);

  //init
  useEffect(() => {
    if (chartContainerRef.current !== null && chartOuterContainerRef.current !== null && tooltipRef.current !== null) {
      const startOptions = defaultOptions;
      startOptions.width = chartOuterContainerRef && chartOuterContainerRef.current ? chartOuterContainerRef.current.clientWidth : undefined;
      startOptions.height = height;
      setOptions(startOptions);

      // eslint-disable-next-line react-hooks/exhaustive-deps
      const newChart = createChart(chartContainerRef.current, startOptions);
      setChart(newChart);

      return () => {
        newChart?.remove();
        setChart(undefined);
      };
    }
  }, []);

  useEffect(() => {
    if (chart && tooltipRef) {
      chart.unsubscribeCrosshairMove(tooltipSubscriber);
      if (showPopover) {
        chart.subscribeCrosshairMove(tooltipSubscriber);
      }
    }
  }, [chart, tooltipRef, showPopover]);

  useEffect(() => {
    if (width !== undefined && chart !== undefined) {
      options.width = width;
      chart?.applyOptions(options);
    }
  }, [width]);

  useEffect(() => {
    if (chart !== undefined && height != undefined) {
      options.height = height;
      chart.applyOptions(options);
    }
  }, [height]);

  useEffect(() => {
    if (chart !== undefined) {
      chart?.applyOptions({
        layout: {
          textColor: theme.palette.foreground,
        },
        grid: {
          vertLines: {
            color: theme.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          },
          horzLines: {
            color: theme.type == 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
          },
        },
        rightPriceScale: {
          borderColor: 'rgba(0,0,0,0.0)',
          visible: hasSides == 'both' || hasSides == 'right',
        },
        leftPriceScale: {
          borderColor: 'rgba(0,0,0,0.0)',
          visible: hasSides == 'both' || hasSides == 'left',
        },
      });
    }
  }, [theme.type, theme.palette.foreground, hasSides]);

  useEffect(() => {
    getValidChildren(arrayChildren).map((child, index) => {
      if (child['ref'] && child['ref']['current']) {
        console.log(child);
      }
    });
  }, [arrayChildren]);

  const config: ChartConfig = {
    chart: chart,
    legends,
  };

  return (
    <ChartContext.Provider value={config}>
      <div className="chart-container" ref={chartOuterContainerRef}>
        <div ref={chartContainerRef}></div>
        <div className="graph-tooltip" ref={tooltipRef}></div>
        {children}
      </div>
      <style jsx>{`
        .chart-container {
          position: relative;
          width: 100%;
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
          border-color: ${theme.palette.border};
          border-radius: 6px;
          font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          color: ${theme.palette.foreground};
          background: ${theme.palette.background};
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
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </ChartContext.Provider>
  );
};

Chart.displayName = 'HimalayaChart';
export default Chart;
