import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { LineType, UTCTimestamp } from '../use-charts';
import { ISeriesApi } from '../use-charts/api/iseries-api';
import { AreaSeriesPartialOptions } from '../use-charts/model/series-options';
import { hexToRgb } from '../utils/color';
import { useChart } from './chart-context';
import { ChartAreaProp, ChartPriceFormatter, ThemedChartDataRecord } from './shared';
import { useConfig } from '../use-config';

const ChartArea = forwardRef(
  (
    {
      side = 'right',
      color,
      title,
      data,
      showTitle = true,
      visible = true,
      priceLineVisible = true,
      lineType = LineType.Curved,
      lastValueVisible,
      priceFormatter = ChartPriceFormatter,
    }: ChartAreaProp,
    ref,
  ) => {
    const { chart } = useChart();
    const { theme } = useConfig();
    const [serie, setSerie] = useState<ISeriesApi<'Area'>>();

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

    const getPropertes = (): AreaSeriesPartialOptions => {
      const currentColor = color ? color : theme.palette.primary.hex_1000;
      const currentColorStart = color ? `rgba(${hexToRgb(color)}, 0.6)` : theme.palette.primary.hex_600;
      const currentColorEnd = color ? `rgba(${hexToRgb(color)}, 0.2)` : theme.palette.primary.hex_200;
      return {
        title: showTitle ? title : undefined,
        visible: visible,
        lineColor: currentColor,
        lineWidth: 2,
        priceScaleId: side,
        priceLineVisible: priceLineVisible || false,
        lastValueVisible: lastValueVisible || false,
        lineType: lineType,
        topColor: currentColorStart,
        bottomColor: currentColorEnd,
        priceFormat: {
          type: 'custom',
          formatter: priceFormatter,
        },
      };
    };

    useEffect(() => {
      if (chart) {
        const line = chart.addAreaSeries(getPropertes());

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
    }, [side, color, title, data, showTitle, visible, lineType, priceLineVisible, lastValueVisible, priceFormatter]);

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

ChartArea.displayName = 'HimalayaChartLine';
export default ChartArea;
