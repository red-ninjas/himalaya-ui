import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { LineType, UTCTimestamp } from '../use-charts';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { LineSeriesPartialOptions } from '../use-charts/model/series-options';
import useTheme from '../use-theme';
import { useChart } from './chart-context';
import { ChartLineProp, ChartPriceFormatter, ThemedChartDataRecord } from './shared';

const ChartLine = forwardRef(
  (
    {
      side = 'right',
      color,
      title,
      data,
      showTitle = true,
      visible = true,
      priceLineVisible = true,
      lastValueVisible,
      priceFormatter = ChartPriceFormatter,
      lineType = LineType.Curved,
    }: ChartLineProp,
    ref,
  ) => {
    const theme = useTheme();
    const { chart } = useChart();

    const [serie, setSerie] = useState<ISeriesApi<'Line'>>();

    useImperativeHandle(ref, () => ({
      update(item: ThemedChartDataRecord) {
        if (serie) {
          serie.update({
            time: item.time as UTCTimestamp,
            value: item.value,
          });
        }
      },

      getTitle() {
        return title;
      },

      isVisible() {
        return visible;
      },
    }));

    const getPropertes = (): LineSeriesPartialOptions => {
      const currentColor = color ? color : theme.palette.primary.value;
      return {
        title: showTitle ? title : undefined,
        visible: visible,
        color: currentColor,
        lineWidth: 2,
        priceScaleId: side,
        priceLineVisible: priceLineVisible || false,
        lastValueVisible: lastValueVisible || false,
        lineType,
        priceFormat: {
          type: 'custom',
          formatter: priceFormatter,
        },
      };
    };

    useEffect(() => {
      if (chart) {
        const line = chart.addLineSeries(getPropertes());

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
    }, [side, color, title, lineType, data, showTitle, visible, priceLineVisible, lastValueVisible, priceFormatter]);

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
    }, [data]);

    return null;
  },
);

ChartLine.displayName = 'HimalayaChartLine';
export default ChartLine;
