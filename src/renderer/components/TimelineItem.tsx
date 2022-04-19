import Part from 'renderer/Part.type';

type Props = {
  part: Part;
  width: number;
  leftPosition: number;
};

const TimelineItem = ({ part, width, leftPosition }: Props) => {
  return (
    <div
      className={`h-[0.4rem] fixed ${
        part.active
          ? 'z-10 bg-green-500'
          : 'z-0 bg-yellow-500 dark:bg-yellow-600'
      }`}
      style={{ width, left: leftPosition }}
    />
  );
};

export default TimelineItem;
