import { memo } from 'react';
import ButtonIcon from './ButtonIcon';

type Props = {
  playing: boolean;
  onControl: (control: 'Play' | 'Pause') => void;
};

const VideoControls = ({ playing, onControl }: Props) => {
  const PlayPauseButton = () => {
    return playing ? (
      <ButtonIcon onClick={() => onControl('Pause')}>
        {/* prettier-ignore */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
        </svg>
      </ButtonIcon>
    ) : (
      <ButtonIcon onClick={() => onControl('Play')}>
        {/* prettier-ignore */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 16 16">
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      </ButtonIcon>
    );
  };

  return <PlayPauseButton />;
};

// Using memo to only re-render when `playing` changes
export default memo(
  VideoControls,
  (prevProps, nextProps) => prevProps.playing === nextProps.playing
);
