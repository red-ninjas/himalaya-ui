'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

const ImageComponent: React.FC<ImageProps> = ({ src = '', disableSkeleton = false, className = '', maxDelay = 3000, alt = '', ...props }: ImageProps) => {
  const { getScaleProps, UNIT, SCALE, CLASS_NAMES } = useScale();

  const width = getScaleProps(['w']);
  const height = getScaleProps(['h']);
  const showAnimation = !disableSkeleton && width && height;

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
    <div className={useClasses('image', className, CLASS_NAMES)}>
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
          overflow: hidden;
          max-width: 100%;
        }

        ${SCALE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'image')}
        ${SCALE.w(1, value => `width: ${value};`, 'auto', 'image')}
        ${SCALE.h(1, value => `height: ${value};`, 'auto', 'image')}
        ${SCALE.mx(0, value => `margin-left: ${value};margin-right: ${value}`, 'auto', 'image')}
        ${SCALE.my(0, value => `margin-top: ${value};margin-bottom: ${value}`, undefined, 'image')}
        ${SCALE.padding(0, value => `padding: ${value.top} ${value.right} ${value.bottom} ${value.left};`, undefined, 'image')}

        ${UNIT('image')}
      `}</style>
    </div>
  );
};

ImageComponent.displayName = 'HimalayaImage';
const Image = withScale(ImageComponent);
export default Image;
