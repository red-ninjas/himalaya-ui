import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { UTCTimestamp } from '../use-charts';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { CandlestickSeriesPartialOptions } from '../use-charts/model/series-options';
import { useChart } from './chart-context';
import { ChartCandleProp, ChartPriceFormatter, ThemedChartDataCandleRecord } from './shared';

const ChartCandle = forwardRef(
  (
    {
      side = 'right',
      title,
      data,
      showTitle = false,
      visible = true,
      priceLineVisible = false,
      lastValueVisible = false,
      priceFormatter = ChartPriceFormatter,
    }: ChartCandleProp,
    ref,
  ) => {
    const { chart } = useChart();

    const [serie, setSerie] = useState<ISeriesApi<'Candlestick'>>();

    useImperativeHandle(ref, () => ({
      update(item: ThemedChartDataCandleRecord) {
        if (serie) {
          serie.update({
            time: item.time as UTCTimestamp,
            close: item.value,
            low: item.low,
            open: item.open,
            high: item.high,
          });
        }
      },
    }));

    const getPropertes = (): CandlestickSeriesPartialOptions => {
      return {
        title: showTitle ? title : undefined,
        visible: visible,
        priceScaleId: side,
        priceLineVisible: priceLineVisible,
        lastValueVisible: lastValueVisible,
        priceFormat: {
          type: 'custom',
          formatter: priceFormatter,
        },
      };
    };

    useEffect(() => {
      if (chart) {
        const line = chart.addCandlestickSeries(getPropertes());

        line.setData(
          data.map(item => {
            return {
              time: item.time as UTCTimestamp,
              close: item.value,
              low: item.low,
              open: item.open,
              high: item.high,
            };
          }),
        );

        setSerie(line);

        return () => {
          chart?.removeSeries(line);
        };
      }
    }, [chart]);

    useEffect(() => {
      if (serie) {
        serie.applyOptions(getPropertes());
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [side, title, data, showTitle, visible, priceLineVisible, lastValueVisible, priceFormatter]);

    useEffect(() => {
      if (serie) {
        serie.setData(
          data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              close: df.value,
              low: df.low,
              open: df.open,
              high: df.high,
            };
          }),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length]);

    return null;
  },
);

ChartCandle.displayName = 'HimalayaChartCandle';
export default ChartCandle;
