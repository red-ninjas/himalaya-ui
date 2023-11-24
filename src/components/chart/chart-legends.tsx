import Checkbox from '../checkbox';
import Text from '../text';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useChart } from './chart-context';

const ChartLegends: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const { series } = useChart();
  const theme = useTheme();
  const { SCALES } = useScale();

  const onVisibleChanged = (legendIds: string[]) => {
    for (const serie of series) {
      serie.api.applyOptions({
        visible: legendIds.includes(serie.api.seriesID()),
      });
    }
  };

  return (
    series &&
    series.length > 0 && (
      <div {...props} className="chart-legends">
        <Text pr={1.5} small style={{ color: theme.palette.accents_3 }}>
          Legend
        </Text>
        <Checkbox.Group scale={0.75} className="legends" onChange={onVisibleChanged} value={series.filter(df => df.visible).map(df => df.key)}>
          {series.map(legend => (
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

ChartLegends.displayName = 'HimalayaChartLegends';
export default withScale(ChartLegends);
