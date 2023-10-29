'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTheme from '../use-theme';
import ImageSkeleton from './image.skeleton';
import { transformDataSource } from './helpers';
import useScale, { withScale } from '../use-scale';
import NextImage from 'next/image';
import useClasses from '../use-classes';

interface Props {
  src?: string;
  disableSkeleton?: boolean;
  className?: string;
  maxDelay?: number;
  radius?: number;
}

type NativeAttrs = Omit<
  React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  'height' | 'width' | 'loading' | 'ref' | 'src' | 'srcSet' | 'placeholder'
>;
export type ImageProps = Props & NativeAttrs;

const ImageComponent: React.FC<ImageProps> = ({
  src = '',
  disableSkeleton = false,
  className = '',
  maxDelay = 3000,
  alt = '',
  radius,
  ...props
}: ImageProps) => {
  const { SCALES, getScaleProps } = useScale();
  const width = getScaleProps(['width', 'w']);
  const height = getScaleProps(['height', 'h']);
  const showAnimation = !disableSkeleton && width && height;

  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(true);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const imageRef = useRef<HTMLImageElement>(null);
  const url = useMemo(() => transformDataSource(src), [src]);

  const imageLoaded = () => {
    if (!showAnimation) return;
    setLoading(false);
  };

  useEffect(() => {
    if (showAnimation && imageRef.current && imageRef.current.complete) {
      setLoading(false);
      setShowSkeleton(false);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      if (showAnimation) {
        setShowSkeleton(false);
      }
      clearTimeout(timer);
    }, maxDelay);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <div className={useClasses('image', className)}>
      {showSkeleton && showAnimation && <ImageSkeleton opacity={loading ? 0.5 : 0} />}
      <NextImage
        ref={imageRef}
        alt={alt}
        onLoad={imageLoaded}
        src={url}
        fill={true}
        style={{
          objectFit: 'contain',
          display: 'inline-block',
        }}
        {...props}
      ></NextImage>
      <style jsx>{`
        .image {
          line-height: 0;
          position: relative;
          border-radius: ${radius === undefined ? theme.style.radius : radius};
          overflow: hidden;
          max-width: 100%;
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)} ${SCALES.ml(0, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
        }
      `}</style>
    </div>
  );
};

ImageComponent.displayName = 'HimalayaImage';
const Image = withScale(ImageComponent);
export default Image;
