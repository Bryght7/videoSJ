import { SyntheticEvent } from 'react';
import VolumeIcon from './VolumeIcon';

type Props = {
  min?: number;
  max?: number;
  value: number;
  onChange: (event: SyntheticEvent) => void;
  onMute: (prevValue: number) => void;
  onUnmute: () => void;
};

const VolumeSlider = ({
  min = 0,
  max = 100,
  value,
  onChange,
  onMute,
  onUnmute,
}: Props) => {
  return (
    <div className="flex">
      <VolumeIcon
        volume={value}
        onMute={(prevValue) => onMute(prevValue)}
        onUnmute={onUnmute}
      />
      <input
        className="w-full"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default VolumeSlider;
