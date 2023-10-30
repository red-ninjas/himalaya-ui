import { EntityThumbnailProps } from './index';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { PropsWithChildren } from 'react';
import Image from '../image';
import useTheme from '../use-theme';

function EntityThumbnailComponent({ size = 24, children, ...other }: PropsWithChildren<EntityThumbnailProps>) {
  const { SCALES } = useScale();
  const theme = useTheme();
  const [, image] = pickChild(children, Image);
  return (
    <>
      <div className="thumbnail-wrapper" {...other}>
        {image}
      </div>
      <style jsx global>{`
        .thumbnail-wrapper {
          display: flex;
          margin-right: ${SCALES.mr(1)};
          width: ${SCALES.width(size / 16)};
          height: ${SCALES.height(size / 16)};

          > .image {
            width: ${SCALES.width(size / 16)};
            height: ${SCALES.height(size / 16)};
            border-radius: 50%;
            background: ${theme.palette.accents_8};
          }
        }

        .entity-footer {
          width: calc(100% - ${SCALES.ml((size + 16) / 16)});
          margin-left: ${SCALES.ml((size + 16) / 16)};
        }
      `}</style>
    </>
  );
}

EntityThumbnailComponent.displayName = 'HimalayaEntityThumbnail';

const EntityThumbnail = withScale(EntityThumbnailComponent);

export default EntityThumbnail;
