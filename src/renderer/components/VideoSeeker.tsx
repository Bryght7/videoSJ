import { ChangeEvent, MouseEvent } from 'react';

type Props = {
  played: number;
  totalDuration: number;
  onChange: (event: ChangeEvent) => void;
  onMouseUp: (event: MouseEvent<HTMLInputElement>) => void;
};

const VideoSeeker = ({ played, totalDuration, onChange, onMouseUp }: Props) => {
  return (
    <input
      className="w-full"
      type="range"
      min={0}
      max={totalDuration}
      value={played}
      onChange={onChange}
      onMouseUp={onMouseUp}
    />
  );
};

export default VideoSeeker;
