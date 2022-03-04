import 'tailwindcss/tailwind.css';

type Props = {
  onVideoEnded: () => void;
};

const VideoPlayer = ({ onVideoEnded }: Props) => {
  return (
    <div>
      <video
        id="videoPlayer"
        className="w-full mb-2 aspect-video"
        onEnded={onVideoEnded}
      >
        <source
          src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoPlayer;
