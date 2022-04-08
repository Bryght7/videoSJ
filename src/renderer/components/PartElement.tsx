import { Draggable } from 'react-beautiful-dnd';

type Props = {
  id: string;
  index: number;
  startTime: number;
  endTime: number;
};

const secondsToTimestamp = (seconds: number) => {
  const hh = Math.floor(seconds / 60 / 60);
  const mm = Math.floor(seconds / 60) - hh * 60;
  const ss = Math.floor(seconds % 60);
  const ms = seconds.toString().split('.')[1] || '0';
  return `${hh.toString().padStart(2, '0')}:${mm
    .toString()
    .padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${ms.padEnd(3, '0')}`;
};

const PartElement = ({ id, index, startTime, endTime }: Props) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="border-2 border-black"
        >
          {secondsToTimestamp(startTime)} to {secondsToTimestamp(endTime)}
        </div>
      )}
    </Draggable>
  );
};

export default PartElement;
