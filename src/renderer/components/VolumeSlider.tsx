import { SyntheticEvent, useEffect } from 'react';
import VolumeIcon from './VolumeIcon';

type Props = {
  min?: number;
  max?: number;
  value: number;
  onChange: (event: SyntheticEvent) => void;
  onMute: (prevValue: number) => void;
  onUnmute: () => void;
};

// Input range theme
const getBackground = (value: number, max: number) =>
  `linear-gradient(to right, #4f46e5 0%, #4f46e5 ${
    (value * 100) / max
  }%, #e5e7eb ${(value * 100) / max}%, #e5e7eb 100%)`;

const VolumeSlider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  onMute,
  onUnmute,
}: Props) => {
  const handleOnInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const element = document.getElementById('inputVolumeSlider');
    if (target && element) {
      // Input range theme
      element.style.background = getBackground(
        parseInt(target.value, 10),
        parseInt(target.max, 10)
      );
    }
  };

  useEffect(() => {
    const element = document.getElementById('inputVolumeSlider');
    if (element) {
      element.style.background = getBackground(value, max);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex items-center">
      <VolumeIcon
        volume={value}
        onMute={(prevValue) => onMute(prevValue)}
        onUnmute={onUnmute}
      />
      <input
        id="inputVolumeSlider"
        className="w-full ml-1"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        onInput={handleOnInput}
      />
    </div>
  );
};

export default VolumeSlider;
