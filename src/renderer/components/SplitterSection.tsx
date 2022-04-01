import { SyntheticEvent, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import VideoControls from './VideoControls';
import VideoTimestamp from './VideoTimestamp';
import VideoSeeker from './VideoSeeker';
import VolumeSlider from './VolumeSlider';
import ButtonIcon from './ButtonIcon';
import InputTimestamp from './InputTimestamp';

const SplitterSection = () => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [videoUrl, setVideoUrl] = useState('');
  const [volume, setVolume] = useState(100);
  const [savedVolume, setSavedVolume] = useState<number>();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

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
      setStartTime(0);
      setEndTime(0);
    }
  };

  const handleSelectStartTime = () => {
    setStartTime(played);
  };

  const handleSelectEndTime = () => {
    setEndTime(played);
  };

  const handleChangeTimestamp = (seconds: number) => {
    setPlayed(seconds);
    if (reactPlayer.current) {
      (reactPlayer.current as ReactPlayer)?.seekTo(seconds);
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
      <div className="flex">
        <VideoControls
          playing={playing}
          ended={!playing && played !== 0 && played === totalDuration}
          onControl={handleControl}
          disabled={videoUrl === ''}
        />
        <ButtonIcon
          disabled={videoUrl === ''}
          title="Select start time"
          onClick={() => handleSelectStartTime()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-1 0v-13a.5.5 0 0 1 .5-.5z"
            />
            <path d="M3 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z" />
          </svg>
        </ButtonIcon>
        <ButtonIcon
          disabled={videoUrl === ''}
          title="Select end time"
          onClick={() => handleSelectEndTime()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 1 0v-13a.5.5 0 0 0-.5-.5z"
            />
            <path d="M13 7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7z" />
          </svg>
        </ButtonIcon>
        <div className="flex items-center space-x-1">
          <InputTimestamp
            seconds={startTime}
            maxLength={12}
            disabled={videoUrl === ''}
            onChange={(seconds) => handleChangeTimestamp(seconds)}
          />
          <span>to</span>
          <InputTimestamp
            seconds={endTime}
            maxLength={12}
            disabled={videoUrl === ''}
            onChange={(seconds) => handleChangeTimestamp(seconds)}
          />
        </div>
      </div>

      <button type="button" id="videoplayer" onClick={handleOpenFile}>
        Open
      </button>
    </div>
  );
};

export default SplitterSection;
