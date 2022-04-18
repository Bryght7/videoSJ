import Duration from './Duration';

type Props = {
  played: number;
  totalDuration: number;
};

const VideoTimestamp = ({ played, totalDuration }: Props) => {
  return (
    <span className="dark:text-zinc-300">
      <Duration seconds={played} /> / <Duration seconds={totalDuration} />
    </span>
  );
};

export default VideoTimestamp;
