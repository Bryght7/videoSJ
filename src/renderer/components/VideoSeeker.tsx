import 'tailwindcss/tailwind.css';

type Props = {
  currentTime: number;
  totalDuration: number;
  onChange: (event) => void;
};

const VideoSeeker = ({ currentTime, totalDuration, onChange }: Props) => {
  return (
    <input
      type="range"
      min={0}
      max={totalDuration}
      value={currentTime}
      onChange={onChange}
    />
  );
};

export default VideoSeeker;
