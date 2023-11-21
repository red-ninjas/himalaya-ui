'use client';

import { ColorType, createChart } from '../use-charts';

import React, { Children, createRef, useEffect, useMemo, useState } from 'react';
import { ChartOptions, IChartApi } from '../use-charts/api/create-chart';
import { MouseEventHandler } from '../use-charts/api/ichart-api';
import { Time } from '../use-charts/model/horz-scale-behavior-time/types';
import { PriceFormatCustom } from '../use-charts/model/series-options';
import useTheme from '../use-theme';
import { DeepPartial } from '../utils/types';
import { ChartConfig, ChartContext } from './chart-context';
import { ChartPriceFormatter, ChartProps, DefaulTimeFormatter } from './shared';
import useScale, { withScale } from '../use-scale';

const toolTipWidth = 80;
const toolTipHeight = 80;
const toolTipMargin = 15;

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
  ...props
}) => {
  const theme = useTheme();
  const chartContainerRef = createRef<HTMLDivElement>();
  const chartOuterContainerRef = createRef<HTMLDivElement>();
  const width = useRefDimensions(chartOuterContainerRef);
  const { SCALES } = useScale();

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

  const config = useMemo<ChartConfig>(
    () => ({
      chart,
    }),
    [chart],
  );

  return (
    <ChartContext.Provider value={config}>
      <div className="chart-container" {...props} ref={chartOuterContainerRef}>
        <div className="chart-inner" ref={chartContainerRef}></div>
        <div className="graph-tooltip" ref={tooltipRef}></div>
        {children}
      </div>
      <style jsx>{`
        .chart-inner {
          padding: ${SCALES.pt(0.475)} ${SCALES.pr(0.875)} ${SCALES.pb(0.475)} ${SCALES.pl(0.875)};
        }
        .chart-container {
          position: relative;
          width: 100%;
          background: transparent;
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.style.radius};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
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

        :global(.series-checkbox .text) {
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </ChartContext.Provider>
  );
};

Chart.displayName = 'HimalayaChart';
export default withScale(Chart);
