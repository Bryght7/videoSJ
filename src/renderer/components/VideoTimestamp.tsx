import Duration from './Duration';

type Props = {
  played: number;
  totalDuration: number;
};

const VideoTimestamp = ({ played, totalDuration }: Props) => {
  return (
    <span>
      <Duration seconds={played} /> / <Duration seconds={totalDuration} />
    </span>
  );
};

export default VideoTimestamp;
