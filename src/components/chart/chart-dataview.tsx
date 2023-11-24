import { forwardRef, useEffect, useState } from 'react';
import Table from '../table';
import { withScale } from '../use-scale';
import { useChart } from './chart-context';
import { ITabledata, ITabledataField } from './shared';

const ChartDataView = forwardRef(() => {
  const { chart } = useChart();

  const updateDataView = async () => {
    await setData(prevArray => {
      if (chart) {
        const _fields: ITabledataField[] = [{ label: 'Time', property: 'time' }];
        const series = chart.getSeries();
        const transform: {} = {};

        for (const serie of series) {
          _fields.push({ label: serie.options().title, property: serie.seriesID() });
          const data = serie.data();
          const id = serie.seriesID();
          const formatter = serie.priceFormatter();
          for (const item of data) {
            const valueUnformatted = item['value'] || item['close'];
            const value = (formatter ? formatter.format(valueUnformatted) : valueUnformatted).toString();
            // const time = timeFormatter(item.time);
            const time = item.time.toString();
            if (transform[time] === undefined) {
              transform[time] = {};
            }

            transform[time].time = time;
            transform[time][id] = value;
          }
        }

        return { data: Object.values(transform), fields: _fields };
      }
      return prevArray;
    });
  };

  const [data, setData] = useState<ITabledata>({
    fields: [
      {
        label: 'Time',
        property: 'time',
      },
    ],
    data: [],
  });

  useEffect(() => {
    if (chart) {
      updateDataView();
      chart.subscribeSerieOptionsChanged(updateDataView);
      chart.subscribeSerieDataChanged(updateDataView);
      chart.subscribeNewSerie(updateDataView);
      chart.subscribeDestroyedSerie(updateDataView);
    }

    return () => {
      if (chart) {
        chart.unsubscribeSerieOptionsChanged(updateDataView);
        chart.unsubscribeNewSerie(updateDataView);
        chart.unsubscribeDestroyedSerie(updateDataView);
        chart.unsubscribeSerieDataChanged(updateDataView);
      }
    };
  }, [chart]);

  return (
    <Table scale={0.75} data={data.data}>
      {data.fields.map((field, index) => (
        <Table.Column key={index} prop={field.property} label={field.label} />
      ))}
    </Table>
  );
});

ChartDataView.displayName = 'HimalayaChartDataView';
export default withScale(ChartDataView);
