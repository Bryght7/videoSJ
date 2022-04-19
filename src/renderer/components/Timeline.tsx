import Part from 'renderer/Part.type';
import TimelineItem from './TimelineItem';

type Props = {
  parts: Part[];
  width: number;
  totalDuration: number;
};

const Timeline = ({ parts, width, totalDuration }: Props) => {
  const calcWidth = (part: Part) =>
    Math.round(((part.endTime - part.startTime) * width) / totalDuration);

  const calcLeftPosition = (part: Part) =>
    Math.round((part.startTime * width) / totalDuration) + 17;

  const items = parts.map((p) => (
    <TimelineItem
      key={p.id}
      part={p}
      width={calcWidth(p)}
      leftPosition={calcLeftPosition(p)}
    />
  ));

  return <div className="flex h-2 border border-gray-400">{items}</div>;
};

export default Timeline;
