import { Card, Grid, useLayout } from 'components';
import { CardTypes } from 'components/utils/prop-types';
import React from 'react';

const types = ['secondary', 'success', 'warning', 'error', 'dark', 'alert', 'purple', 'violet', 'cyan', 'lite'];

const Colors: React.FC<React.PropsWithChildren<unknown>> = () => {
  const layout = useLayout();
  return (
    <div className="colors">
      <Grid.Container gap={1} pl={0} mr="10px">
        {types.map((type, index) => {
          return (
            <Grid xs={12} key={`${type}-${index}`}>
              <Card w="100%" type={type as CardTypes}>
                {type}
              </Card>
            </Grid>
          );
        })}
      </Grid.Container>
      <style jsx>{`
        .colors {
          display: flex;
          flex-wrap: wrap;
        }

        .color-card {
          display: flex;
          width: 9rem;
          margin-right: var(--layout-gap-half);
          margin-bottom: var(--layout-gap-half);
        }
      `}</style>
    </div>
  );
};

export default Colors;
