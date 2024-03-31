import Checkbox from '../checkbox';
import Text from '../text';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { useChart } from './chart-context';

const ChartLegends: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
  const { series } = useChart();
  const { RESPONSIVE, SCALE_CLASSES, SCALER } = useScale();

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
      <div {...props} className={useClasses('chart-legends', SCALE_CLASSES)}>
        <Text pr={1.5} small style={{ color: `var(--color-background-600)` }}>
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
            background: var(--color-background-900);
          }

          ${RESPONSIVE.margin(
            { left: 0, right: 0, top: 1, bottom: 0 },
            value => `margin: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'chart-legends',
          )}

          ${RESPONSIVE.padding(
            { left: 0.875, right: 0.875, top: 0.475, bottom: 0.475 },
            value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`,
            undefined,
            'chart-legends',
          )}
          ${RESPONSIVE.r(1, value => `border-radius: 0 0 ${value} ${value};`, 'var(--layout-radius)', 'chart-legends')}


          ${SCALER('chart-legends')}
        `}</style>
      </div>
    )
  );
};

ChartLegends.displayName = 'HimalayaChartLegends';
export default withScale(ChartLegends);
