import { useEffect } from 'react';
import Checkbox from '../checkbox';
import { useChart } from './chart-context';

const ChartLegends: React.FC = () => {
  const { legends } = useChart();

  useEffect(() => {
    console.log('SETUP', legends);
  }, [legends]);

  return (
    <>
      Legend
      <Checkbox.Group scale={0.75} className="legends" value={[]}>
        {Object.keys(legends).map(i => (
          <Checkbox key={i} className="series-checkbox" value={i}>
            {i}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </>
  );
};

ChartLegends.displayName = 'HimalayaChartLegends';
export default ChartLegends;
