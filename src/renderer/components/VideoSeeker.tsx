import { SyntheticEvent } from 'react';

type Props = {
  played: number;
  totalDuration: number;
  onChange: (event: SyntheticEvent) => void;
};

const VideoSeeker = ({ played, totalDuration, onChange }: Props) => {
  const handleOnInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const element = document.getElementById('inputVideoSeeker');
    if (target && element) {
      // Input range theme
      element.style.background = `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
        (parseInt(target.value, 10) * 100) / parseInt(target.max, 10)
      }%, #e5e7eb ${
        (parseInt(target.value, 10) * 100) / parseInt(target.max, 10)
      }%, #e5e7eb 100%)`;
    }
  };

  return (
    <input
      id="inputVideoSeeker"
      className="w-full"
      type="range"
      min={0}
      max={totalDuration}
      value={played}
      onChange={onChange}
      onInput={handleOnInput}
    />
  );
};

export default VideoSeeker;
