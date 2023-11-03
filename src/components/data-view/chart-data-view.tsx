'use client';

import Text from '../text';

import React, { useState } from 'react';
import ThemedChart, { ChartProps } from '../chart';
import Toggle from '../toggle';
import useTheme from '../use-theme';
import DataView from './data-view';
const defaultDataViewHeight = 350;

const GraphDataView: React.FC<ChartProps> = ({ height = defaultDataViewHeight, timeFormatter, ...props }) => {
  const theme = useTheme();

  const [isDataView, setIsDataView] = useState<boolean>(false);
  const dataViewHandler = (event: any) => {
    setIsDataView(event.target.checked);
  };

  return (
    <div className="data-view-core" style={{ height: height }}>
      <div className="dataViewSwitcher">
        <Text style={{ color: theme.palette.accents_5 }} mb={0} font={'14px'} mt={0} mr={0}>
          Data view
        </Text>
        <Toggle onChange={dataViewHandler} />
      </div>

      {isDataView ? (
        <DataView series={props.series} timeFormatter={timeFormatter} height={height}></DataView>
      ) : (
        <ThemedChart context={theme} timeFormatter={timeFormatter} height={height} {...props}></ThemedChart>
      )}

      <style jsx>{`
        .data-view-core {
        }
        .dataViewSwitcher {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
};

export default GraphDataView;
