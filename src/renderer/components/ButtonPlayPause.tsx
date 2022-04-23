import { memo } from 'react';
import ButtonIcon from './ButtonIcon';

type Props = {
  playing: boolean;
  ended: boolean;
  disabled?: boolean;
  onControl: (control: 'play' | 'pause') => void;
};

const ButtonPlayPause = ({
  playing,
  onControl,
  ended,
  disabled = false,
}: Props) => {
  if (playing) {
    return (
      <ButtonIcon disabled={disabled} onClick={() => onControl('pause')}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
        </svg>
      </ButtonIcon>
    );
  }
  return (
    <ButtonIcon disabled={disabled} onClick={() => onControl('play')}>
      {ended ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="w-5 h-5"
          viewBox="0 0 16 16"
        >
          <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
        </svg>
      )}
    </ButtonIcon>
  );
};

// Using memo to only re-render when `playing` changes
export default memo(
  ButtonPlayPause,
  (prevProps, nextProps) =>
    prevProps.playing === nextProps.playing &&
    prevProps.disabled === nextProps.disabled &&
    prevProps.ended === nextProps.ended
);
