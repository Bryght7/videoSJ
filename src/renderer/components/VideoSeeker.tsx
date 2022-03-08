import { SyntheticEvent } from 'react';

type Props = {
  played: number;
  totalDuration: number;
  onChange: (event: SyntheticEvent) => void;
};

const VideoSeeker = ({ played, totalDuration, onChange }: Props) => {
  return (
    <input
      className="w-full"
      type="range"
      min={0}
      max={totalDuration}
      value={played}
      onChange={onChange}
    />
  );
};

export default VideoSeeker;
