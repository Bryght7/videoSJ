import { SyntheticEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoControls from './VideoControls';
import VideoTimestamp from './VideoTimestamp';
import VideoSeeker from './VideoSeeker';
import VolumeSlider from './VolumeSlider';

const SplitterSection = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [volume, setVolume] = useState(100);
  const [savedVolume, setSavedVolume] = useState<number>();

  const reactPlayer = useRef(null);

  const handleOnEnded = () => {
    setPlaying(false);
    setPlayed(totalDuration);
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

  const handleSeekChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setPlayed(parseInt(target.value, 10));
    if (reactPlayer.current) {
      (reactPlayer.current as ReactPlayer)?.seekTo(parseInt(target.value, 10));
    }
  };

  const handleVolumeChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setVolume(parseInt(target.value, 10));
  };

  const handleOnMute = (prevVolume: number) => {
    setSavedVolume(prevVolume); // save previous volume to restore it later
    setVolume(0);
  };

  const handleOnUnmute = () => {
    if (savedVolume) {
      setVolume(savedVolume); // restore saved volume
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
          volume={volume / 100}
          onEnded={handleOnEnded}
          onDuration={handleOnDuration}
          onProgress={handleOnProgress}
        />
      </div>
      <div className="flex items-center justify-between w-full">
        <VideoSeeker
          played={played}
          totalDuration={totalDuration}
          onChange={handleSeekChange}
        />
        <div className="w-[205px] mx-2.5">
          <VideoTimestamp played={played} totalDuration={totalDuration} />
        </div>
        <div className="w-28">
          <VolumeSlider
            value={volume}
            onChange={handleVolumeChange}
            onMute={handleOnMute}
            onUnmute={handleOnUnmute}
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <VideoControls
          playing={playing}
          ended={!playing && played !== 0 && played === totalDuration}
          onControl={handleControl}
          disabled={videoUrl === ''}
        />
      </div>

      <button type="button" id="videoplayer" onClick={handleOpenFile}>
        Open
      </button>
    </div>
  );
};

export default SplitterSection;
