type Props = {
  volume: number;
  onMute: (prevVolume: number) => void;
  onUnmute: () => void;
};

const VolumeIcon = ({ volume, onMute, onUnmute }: Props) => {
  const VolumeMuted = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      className="w-5 h-5"
      viewBox="0 0 75 75"
      onClick={onUnmute}
    >
      <path
        d="m39,14-17,15H6V48H22l17,15z"
        fill="#111"
        strokeLinejoin="round"
        stroke="#111"
        strokeWidth="5"
      />
      <path
        d="m49,26 20,24m0-24-20,24"
        fill="none"
        strokeLinecap="round"
        stroke="#111"
        strokeWidth="5"
      />
    </svg>
  );

  const VolumeLow = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      className="w-5 h-5"
      viewBox="0 0 75 75"
      onClick={() => onMute(volume)}
    >
      <path
        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
        stroke="#111"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="#111"
      />
      <path
        d="m48,27.6a19.5,19.5 0 0 1 0,21.4m13.6,13.6"
        fill="none"
        stroke="#111"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );

  const VolumeMid = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      className="w-5 h-5"
      viewBox="0 0 75 75"
      onClick={() => onMute(volume)}
    >
      <path
        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
        stroke="#111"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="#111"
      />
      <path
        d="m48,27.6a19.5,19.5 0 0 1 0,21.4m7.1,-28.5a30,30 0 0 1 0,35.6m6.5,6.5"
        strokeLinecap="round"
        strokeWidth="5"
        stroke="#111"
        fill="none"
      />
    </svg>
  );

  const VolumeHigh = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      className="w-5 h-5"
      viewBox="0 0 75 75"
      onClick={() => onMute(volume)}
    >
      <path
        d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
        stroke="#111"
        strokeWidth="5"
        strokeLinejoin="round"
        fill="#111"
      />
      <path
        d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
        fill="none"
        stroke="#111"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );

  // Muted icon
  if (volume === 0) {
    return <VolumeMuted />;
  }
  // Volume 1 icon
  if (volume > 0 && volume <= 33) {
    return <VolumeLow />;
  }
  // Volume 2 icon
  if (volume > 33 && volume <= 66) {
    return <VolumeMid />;
  }
  // Volume 3 icon
  if (volume > 66 && volume <= 100) {
    return <VolumeHigh />;
  }
  return <span>Invalid volume</span>;
};

export default VolumeIcon;
