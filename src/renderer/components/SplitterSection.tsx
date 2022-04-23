import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Part from 'renderer/Part.type';
import ReactPlayer from 'react-player';
import VideoTimestamp from './VideoTimestamp';
import VideoSeeker from './VideoSeeker';
import VolumeSlider from './VolumeSlider';
import ButtonIcon from './ButtonIcon';
import InputTimestamp from './InputTimestamp';
import DropZone from './DropZone';
import Timeline from './Timeline';
import ButtonPlayPause from './ButtonPlayPause';
import ButtonSkip from './ButtonSkip';

type Props = {
  videoUrl: string;
  loadTimestamp: number;
  parts: Part[];
  onSplit: (startTime: number, endTime: number) => void;
  onVideoLoad: (filePath: string) => void;
};

const SplitterSection = ({
  videoUrl,
  loadTimestamp,
  parts,
  onSplit,
  onVideoLoad,
}: Props) => {
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [savedVolume, setSavedVolume] = useState<number>();
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const reactPlayer = useRef(null);

  const seekTo = (seconds: number) => {
    setPlayed(seconds);
    if (reactPlayer.current) {
      (reactPlayer.current as ReactPlayer)?.seekTo(seconds);
    }
  };

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

  const handleControl = (
    control: 'play' | 'pause' | 'forward' | 'backward',
    value?: number
  ) => {
    switch (control) {
      case 'play':
        setPlaying(true);
        break;
      case 'pause':
        setPlaying(false);
        break;
      case 'forward':
      case 'backward':
        if (value) {
          let newPlayed = played + (control === 'forward' ? value : -value);
          // handle overflows
          if (newPlayed < 0) {
            newPlayed = 0;
          } else if (newPlayed > totalDuration) {
            newPlayed = totalDuration;
          }
          seekTo(newPlayed);
        }
        break;
      default:
    }
  };

  const handleSeekChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    seekTo(parseInt(target.value, 10));
  };

  const handleVolumeChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setVolume(parseInt(target.value, 10));
    window.localStorage.setItem('volume', target.value);
  };

  const handleOnMute = (prevVolume: number) => {
    setSavedVolume(prevVolume); // save previous volume to restore it later
    setVolume(0);
    window.localStorage.setItem('volume', '0');
  };

  const handleOnUnmute = () => {
    if (savedVolume) {
      setVolume(savedVolume); // restore saved volume
      window.localStorage.setItem('volume', savedVolume.toString());
    } else {
      setVolume(100);
      window.localStorage.setItem('volume', '100');
    }
  };

  const handleOpenFile = async () => {
    const filePath = await window.api.openFileDialog();
    if (filePath) {
      onVideoLoad(filePath);
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

  const handleChangeStartTime = (seconds: number) => {
    setStartTime(seconds);
    seekTo(seconds);
  };

  const handleChangeEndTime = (seconds: number) => {
    setEndTime(seconds);
    seekTo(seconds);
  };

  const handleAddToParts = () => {
    onSplit(startTime, endTime);
  };

  const handleOnDropVideo = (file: File) => {
    onVideoLoad(file.path);
    setStartTime(0);
    setEndTime(0);
  };

  useEffect(() => {
    window.api.menuOpenFile(() => {
      handleOpenFile();
    });
    const storedVolume = window.localStorage.getItem('volume');
    if (storedVolume) {
      setVolume(parseInt(storedVolume, 10));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // using [] to execute only once

  useEffect(() => {
    seekTo(loadTimestamp);
  }, [loadTimestamp]);

  return (
    <>
      <div className="mb-2 bg-black drop-shadow-sm">
        <DropZone
          acceptedTypes={['video/mp4', 'video/m4v', 'video/avi', 'video/mkv']}
          onDrop={handleOnDropVideo}
        />
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
      <div className="mb-3 w-[415px]">
        <Timeline width={415} parts={parts} totalDuration={totalDuration} />
      </div>
      <div className="flex space-x-2">
        <ButtonPlayPause
          playing={playing}
          ended={!playing && played !== 0 && played === totalDuration}
          onControl={handleControl}
          disabled={videoUrl === ''}
        />
        <ButtonSkip
          direction="backward"
          disabled={videoUrl === ''}
          onControl={handleControl}
        />
        <ButtonSkip
          direction="forward"
          disabled={videoUrl === ''}
          onControl={handleControl}
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
            onChange={(seconds) => handleChangeStartTime(seconds)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            className="fill-black dark:fill-zinc-300"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
          <InputTimestamp
            seconds={endTime}
            maxLength={12}
            disabled={videoUrl === ''}
            invalid={startTime !== 0 && endTime !== 0 && endTime <= startTime}
            invalidTitle="End time must be greater than start time"
            onChange={(seconds) => handleChangeEndTime(seconds)}
          />
          <ButtonIcon
            disabled={videoUrl === '' || endTime <= startTime}
            title="Add to parts"
            onClick={() => handleAddToParts()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-6 h-6"
              viewBox="1 1 14 14"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </ButtonIcon>
        </div>
      </div>
    </>
  );
};

export default SplitterSection;
