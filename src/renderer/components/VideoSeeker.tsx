import { SyntheticEvent, useEffect } from 'react';

type Props = {
  played: number;
  totalDuration: number;
  onChange: (event: SyntheticEvent) => void;
};

// Input range theme
const getBackground = (value: number, max: number) =>
  `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
    (value * 100) / max
  }%, #e5e7eb ${(value * 100) / max}%, #e5e7eb 100%)`;

const VideoSeeker = ({ played, totalDuration, onChange }: Props) => {
  const handleOnInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const element = document.getElementById('inputVideoSeeker');
    if (target && element) {
      element.style.background = getBackground(
        parseInt(target.value, 10),
        parseInt(target.max, 10)
      );
    }
  };

  useEffect(() => {
    const element = document.getElementById('inputVideoSeeker');
    if (element) {
      element.style.background = getBackground(played, totalDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [played]);

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
