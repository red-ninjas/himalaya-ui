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

const ResponsiveImageComponent: React.FC<ImageProps> = ({
  src = '',
  disableSkeleton = false,
  className = '',
  maxDelay = 3000,
  alt = '',
  radius,
  ...props
}: ImageProps) => {
  const { SCALES, getScaleProps } = useScale();
  const w = getScaleProps(['width', 'w']) || 0;
  const h = getScaleProps(['height', 'h']) || 0;
  const width = typeof w === 'string' ? parseFloat(w) : w;
  const height = typeof h === 'string' ? parseFloat(h) : h;
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

  const ratio = (width / height) * 100;

  return (
    <div className={useClasses('image', className)}>
      <div className="image-container">
        {showSkeleton && showAnimation && <ImageSkeleton opacity={loading ? 0.5 : 0} />}
        <NextImage
          ref={imageRef}
          alt={alt}
          onLoad={imageLoaded}
          src={url}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          {...props}
        ></NextImage>
      </div>
      <style jsx>{`
        .image-container {
          width: 100%;
          padding-top: ${ratio}%;
        }
        .image {
          line-height: 0;
          position: relative;
          border-radius: ${radius === undefined ? theme.style.radius : radius};
          overflow: hidden;
          max-width: 100%;
          width: 100%;
          height: auto;
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)} ${SCALES.ml(0, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
        }
      `}</style>
    </div>
  );
};

ResponsiveImageComponent.displayName = 'HimalayaResponsiveImage';
const ResponsiveImage = withScale(ResponsiveImageComponent);
export default ResponsiveImage;
