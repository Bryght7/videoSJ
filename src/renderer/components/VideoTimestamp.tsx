import { useCallback, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';

type Props = {
  currentTime: number;
  totalDuration: number;
};

const VideoTimestamp = ({ currentTime, totalDuration }: Props) => {
  const [time, setTime] = useState('00:00:00');

  const getTime = useCallback((timestamp: number) => {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = timestamp % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  // When prop `currentTime` changes, convert to HH:MM:SS time
  useEffect(() => {
    setTime(getTime(currentTime));
  }, [currentTime, getTime]);

  return (
    <span>
      {time} / {getTime(totalDuration)}
    </span>
  );
};

export default VideoTimestamp;
