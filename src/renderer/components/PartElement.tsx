import { Draggable } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';

type Props = {
  index: number;
  part: Part;
  onDelete: (index: number) => void;
};

const secondsToTimestamp = (seconds: number) => {
  const hh = Math.floor(seconds / 60 / 60);
  const mm = Math.floor(seconds / 60) - hh * 60;
  const ss = Math.floor(seconds % 60);
  const ms = seconds.toString().split('.')[1] || '0';
  return `${hh.toString().padStart(2, '0')}:${mm
    .toString()
    .padStart(2, '0')}:${ss.toString().padStart(2, '0')}.${ms
    .padEnd(3, '0')
    .substring(0, 3)}`;
};

const PartElement = ({ index, part, onDelete }: Props) => {
  return (
    <Draggable draggableId={part.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`flex justify-between items-center px-4 h-8 ${part.bgColor}`}
        >
          <p className="font-semibold">#{index + 1}</p>
          <p className="flex items-center">
            {secondsToTimestamp(part.startTime)}{' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>{' '}
            {secondsToTimestamp(part.endTime)}
          </p>
          <button type="button" onClick={() => onDelete(index)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="bg-white rounded-full fill-blue-700 hover:fill-blue-800"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default PartElement;
