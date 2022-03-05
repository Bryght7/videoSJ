import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoControls from './VideoControls';
import VideoTimestamp from './VideoTimestamp';
import VideoSeeker from './VideoSeeker';

const SplitterSection = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');

  const reactPlayer = useRef(null);

  const handleOnEnded = () => {
    setPlaying(false);
  };

  const handleOnDuration = (duration: number) => {
    setTotalDuration(duration);
  };

  const handleOnProgress = (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setPlayed(state.playedSeconds);
  };

  const handleControl = (control: 'Play' | 'Pause') => {
    switch (control) {
      case 'Play':
        setPlaying(true);
        break;
      case 'Pause':
        setPlaying(false);
        break;
      default:
    }
  };

  const handleSeekChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setPlayed(parseInt(target.value, 10));
  };

  const handleSeekMouseUp = (
    event: MouseEvent<HTMLInputElement, globalThis.MouseEvent>
  ) => {
    const target = event.target as HTMLInputElement;
    if (reactPlayer.current) {
      (reactPlayer.current as ReactPlayer)?.seekTo(parseInt(target.value, 10));
    }
  };

  const handleOpenFile = async () => {
    const filePath = await window.api.openFileDialog();
    if (filePath) {
      setVideoUrl(`vsj://${filePath}`);
    }
  };

  return (
    <div>
      <div className="mb-2 bg-black">
        <ReactPlayer
          ref={reactPlayer}
          url={videoUrl}
          playing={playing}
          onEnded={handleOnEnded}
          onDuration={handleOnDuration}
          onProgress={handleOnProgress}
        />
      </div>
      <button type="button" id="videoplayer" onClick={handleOpenFile}>
        Open
      </button>
      <VideoControls playing={playing} onControl={handleControl} />
      <VideoTimestamp played={played} totalDuration={totalDuration} />
      <VideoSeeker
        played={played}
        totalDuration={totalDuration}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
    </div>
  );
};

export default SplitterSection;
