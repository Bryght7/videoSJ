import { memo } from 'react';

type Props = {
  seconds: number;
};

const format = (seconds: number) => {
  const hh = Math.floor(seconds / 60 / 60);
  const mm = Math.floor(seconds / 60) - hh * 60;
  const ss = Math.floor(seconds % 60);
  return `${hh.toString().padStart(2, '0')}:${mm
    .toString()
    .padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};

const Duration = ({ seconds }: Props) => {
  return <time dateTime={`P${Math.floor(seconds)}S`}>{format(seconds)}</time>;
};

// Using memo to only re-render when `seconds` changes
export default memo(
  Duration,
  (prevProps, nextProps) => prevProps.seconds === nextProps.seconds
);
