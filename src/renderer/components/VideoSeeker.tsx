import { SyntheticEvent } from 'react';

type Props = {
  played: number;
  totalDuration: number;
  onChange: (event: SyntheticEvent) => void;
  onMouseUp: (event: SyntheticEvent) => void;
  onKeyUp: (event: SyntheticEvent) => void;
};

const VideoSeeker = ({
  played,
  totalDuration,
  onChange,
  onMouseUp,
  onKeyUp,
}: Props) => {
  return (
    <input
      className="w-full"
      type="range"
      min={0}
      max={totalDuration}
      value={played}
      onChange={onChange}
      onMouseUp={onMouseUp}
      onKeyUp={onKeyUp}
    />
  );
};

export default VideoSeeker;
