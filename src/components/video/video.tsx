'use client';
import React, { useRef, useState } from 'react';
import { Maximize, Minimize, PauseFill, PlayFill, Volume2, VolumeX } from '../icons';
import useScale, { withScale } from '../use-scale';
import useClasses from '../use-classes';

interface Props {
  src: string;
  controls: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  poster?: string;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLVideoElement>, keyof Props>;
export type VideoProps = Props & NativeAttrs;

const Video: React.FC<VideoProps> = ({ src, controls, poster, loop = false, autoplay = false, muted = false, ...props }) => {
  const { SCALER, RESPONSIVE, SCALE_CLASSES } = useScale();

  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  const handletoggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current) {
        videoRef.current.requestFullscreen();
      }
    } else {
      setIsFullScreen(!isFullScreen);
    }
  };

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0'); // Ensure two-digit format.
    const formattedSeconds = String(remainingSeconds).padStart(2, '0'); // Ensure two-digit format.

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = e => {
    const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className={useClasses('video-player', SCALE_CLASSES)}>
      <div className="video-container">
        <video
          {...props}
          ref={videoRef}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          poster={poster}
          onClick={() => {
            if (!controls) {
              if (isPlaying) {
                videoRef.current?.pause();
              } else {
                videoRef.current?.play();
              }
              setIsPlaying(!isPlaying);
            }
          }}
          onTimeUpdate={() => {
            if (videoRef.current) {
              setCurrentTime(videoRef.current.currentTime);
            }
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) {
              setDuration(videoRef.current.duration);
            }
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
        {controls && (
          <div className="controls">
            <button onClick={handlePlayPause}>{isPlaying ? <PauseFill /> : <PlayFill />}</button>
            <div className="video-info">
              <span>{formatTime(currentTime)}</span>
            </div>
            <div className="progress-bar" onClick={handleSeek}>
              <div className="progress" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
            </div>
            <span>{formatTime(duration)}</span>
            <button onClick={handletoggleMute}>{isMuted ? <VolumeX /> : <Volume2 />}</button>
            <button onClick={handleFullScreen}>{isFullScreen ? <Minimize /> : <Maximize />}</button>
          </div>
        )}
      </div>

      <style jsx>{`
        .video-player {
          position: relative;
          max-width: 100%;
          margin: 0 auto;
          width: var(--video-width);
          height: var(--video-height);
        }
        .video-player video {
          width: 100%;
          cursor: ${controls ? 'default' : 'pointer'};
        }
        .video-player .video-container {
          display: flex;
          justify-content: center;
        }
        .controls {
          position: absolute;
          bottom: 5%;
          background-color: var(--color-background-1000);
          height: 56px;
          display: flex;
          opacity: 0;
          align-items: center;
          justify-content: center;
          padding: 0 8px;
          width: 85%;
          transform: translate3d(0, 6px, 0);
          transition: all 0.2s cubic-bezier(0.25, 0.57, 0.45, 0.94);
        }
        .video-player:hover .controls {
          opacity: 1;
          transform: translateZ(0);
          display: flex;
        }
        .controls .progress-bar {
          background-color: var(--color-background-300);
          height: 4px;
          cursor: pointer;
          width: 100%;
          margin-right: 8px;
        }
        .controls .progress {
          background-color: #007bff;
          height: 100%;
          transition: width 0.1s linear;
        }
        .controls button,
        .controls span {
          color: var(--color-foreground-1000);
          font-size: 16px;
          margin-right: 10px;
          border: none;
          background-color: transparent;
          cursor: pointer;
          outline: none;
        }
        .controls button:hover,
        .controls input[type='range']:hover {
          opacity: 0.8;
        }
        .controls button:active,
        .controls input[type='range']:active {
          opacity: 0.6;
        }
        .controls button.active {
          color: #00ccff;
        }
        .controls span {
          font-weight: bold;
        }

        ${RESPONSIVE.r(1, value => `border-radius: ${value};`, 'var(--layout-radius)', 'controls')}

        ${RESPONSIVE.h(1, value => `--video-height: ${value};`, 'auto', 'video-player')}
        ${RESPONSIVE.w(1, value => `--video-width: ${value};`, '100%', 'video-player')}


        ${SCALER('video-player')}
      `}</style>
    </div>
  );
};

Video.displayName = 'HimalayaVideo';
export default withScale(Video);
