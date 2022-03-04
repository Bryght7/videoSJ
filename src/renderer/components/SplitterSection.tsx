import { useCallback, useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import VideoPlayer from './VideoPlayer';
import VideoControls from './VideoControls';
import VideoTimestamp from './VideoTimestamp';
import VideoSeeker from './VideoSeeker';

const SplitterSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [videoElement, setVideoElement] = useState<HTMLMediaElement>();

  // TODO: when I implement open file, maybe see if I can put this there
  useEffect(() => {
    setVideoElement(document.getElementById('videoPlayer') as HTMLMediaElement);
    setInterval(() => {
      if (videoElement) {
        setCurrentTime(Math.floor(videoElement.currentTime));
        if (!Number.isNaN(videoElement.duration)) {
          setTotalDuration(Math.floor(videoElement.duration));
        }
      }
    }, 100);
  }, [videoElement]);

  const handleOnVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleControl = useCallback(
    (control: 'Play' | 'Pause' | 'Stop') => {
      if (videoElement) {
        switch (control) {
          case 'Play':
            videoElement.play();
            setIsPlaying(true);
            break;
          case 'Pause':
            videoElement.pause();
            setIsPlaying(false);
            break;
          case 'Stop':
            videoElement.pause();
            videoElement.currentTime = 0;
            setIsPlaying(false);
            break;
          default:
        }
      }
    },
    [videoElement]
  );

  const handleSeekChange = (event) => {
    setCurrentTime(event.target.value);
  };

  return (
    <div>
      <VideoPlayer onVideoEnded={handleOnVideoEnded} />
      <VideoControls isPlaying={isPlaying} onControl={handleControl} />
      <VideoTimestamp currentTime={currentTime} totalDuration={totalDuration} />
      <VideoSeeker
        currentTime={currentTime}
        totalDuration={totalDuration}
        onChange={handleSeekChange}
      />
    </div>
  );
};

export default SplitterSection;
