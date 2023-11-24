import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { UTCTimestamp } from '../use-charts';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { HistogramSeriesPartialOptions } from '../use-charts/model/series-options';
import useTheme from '../use-theme';
import { useChart } from './chart-context';
import { ChartBarProp, ChartPriceFormatter, ThemedChartDataRecord } from './shared';

const ChartBar = forwardRef(
  (
    {
      side = 'right',
      color,
      title,
      data,
      showTitle = false,
      visible = true,
      priceLineVisible = false,
      lastValueVisible,
      priceFormatter = ChartPriceFormatter,
    }: ChartBarProp,
    ref,
  ) => {
    const theme = useTheme();
    const { chart } = useChart();

    const [serie, setSerie] = useState<ISeriesApi<'Histogram'>>();

    useImperativeHandle(ref, () => ({
      update(item: ThemedChartDataRecord) {
        if (serie) {
          serie.update({
            time: item.time as UTCTimestamp,
            value: item.value,
          });
        }
      },
    }));

    const getPropertes = (): HistogramSeriesPartialOptions => {
      const currentColor = color ? color : theme.palette.primary.value;
      return {
        title: showTitle ? title : undefined,
        visible: visible,
        color: currentColor,
        priceScaleId: side,
        priceLineVisible: priceLineVisible || false,
        lastValueVisible: lastValueVisible || false,
        priceFormat: {
          type: 'custom',
          formatter: priceFormatter,
        },
      };
    };

    useEffect(() => {
      if (chart) {
        const line = chart.addHistogramSeries(getPropertes());

        line.setData(
          data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              value: df.value,
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
    }, [side, color, title, data, showTitle, visible, priceLineVisible, lastValueVisible, priceFormatter]);

    useEffect(() => {
      if (serie) {
        serie.setData(
          data.map(df => {
            return {
              time: df.time as UTCTimestamp,
              value: df.value,
            };
          }),
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.length]);

    return null;
  },
);

ChartBar.displayName = 'HimalayaChartBar';
export default ChartBar;
