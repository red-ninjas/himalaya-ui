import RunningText from './running-text';
export interface NativeRunningTextProps {
  animationTime?: number;
  gap?: number;
}

type NativeAttrs = Omit<React.HTMLAttributes<HTMLDivElement>, keyof NativeRunningTextProps>;
export type RunningTextProps = NativeRunningTextProps & NativeAttrs;

export default RunningText;
