import useScale, { withScale } from '../use-scale';
import { useEffect, useState } from 'react';
import Checkbox from '../checkbox';
import Text from '../text';
import { OnNewSerieHandler } from '../use-charts/api/ichart-api';
import { Time } from '../use-charts/model/horz-scale-behavior-time/types';
import useTheme from '../use-theme';
import { useChart } from './chart-context';
import { ILegendStatesDictonary, LegendDictonary } from './shared';

const ChartDataView: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const { chart } = useChart();
  const [_series, _setSeries] = useState<LegendDictonary>({});
  const [legends, setLegends] = useState<ILegendStatesDictonary>([]);
  const theme = useTheme();
  const { SCALES } = useScale();
  const newChartDetected: OnNewSerieHandler<Time> = props => {
    const newSeries = { ..._series };
    newSeries[props.seriesID()] = props;
    _setSeries(newSeries);

    setLegends([
      ...legends,
      {
        visible: props.options().visible,
        title: props.options().title,
        key: props.seriesID(),
      },
    ]);
  };

  const deleteChartDetected: OnNewSerieHandler<Time> = props => {
    const newSeries = { ..._series };
    delete newSeries[props.seriesID()];

    _setSeries(newSeries);
    setLegends(legends.filter(a => a.key !== props.seriesID()));
  };

  //init
  useEffect(() => {
    if (chart) {
      const newSeries = { ..._series };
      const newLegends: ILegendStatesDictonary = [];
      for (const serie of chart.getSeries()) {
        newSeries[serie.seriesID()] = serie;

        newLegends.push({
          visible: serie.options().visible,
          title: serie.options().title,
          key: serie.seriesID(),
        });
      }
      _setSeries(newSeries);
      setLegends(newLegends);

      chart.subscribeNewSerie(newChartDetected);
      chart.subscribeDestroyedSerie(deleteChartDetected);

      return () => {
        chart.unsubscribeNewSerie(newChartDetected);
        chart.unsubscribeDestroyedSerie(deleteChartDetected);
      };
    }
  }, [chart]);

  const onVisibleChanged = (legendIds: string[]) => {
    for (const serieId in _series) {
      _series[serieId].applyOptions({ visible: legendIds.includes(serieId) });

      const newLegends = legends.map(df => {
        df.visible = legendIds.includes(df.key);
        return df;
      });

      setLegends(newLegends);
    }
  };

  return (
    legends &&
    legends.length > 0 && (
      <div {...props} className="chart-legends">
        <Text pr={1.5} small style={{ color: theme.palette.accents_3 }}>
          Legend
        </Text>
        <Checkbox.Group scale={0.75} className="legends" onChange={onVisibleChanged} value={legends.filter(df => df.visible).map(df => df.key)}>
          {legends.map(legend => (
            <Checkbox key={legend.key} className="series-checkbox" value={legend.key}>
              {legend.title}
            </Checkbox>
          ))}
        </Checkbox.Group>

        <style jsx>{`
          .chart-legends {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            background: ${theme.palette.accents_0};
            border-radius: 0 0 ${theme.style.radius} ${theme.style.radius};
            padding: ${SCALES.pt(0.475)} ${SCALES.pr(0.875)} ${SCALES.pb(0.475)} ${SCALES.pl(0.875)};
            margin: ${SCALES.mt(1)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          }
        `}</style>
      </div>
    )
  );
};

ChartDataView.displayName = 'HimalayaChartDataView';
export default withScale(ChartDataView);
