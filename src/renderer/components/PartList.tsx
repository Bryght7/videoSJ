import { Droppable } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartElement from './PartElement';

type Props = {
  parts: Part[];
};

const PartList = ({ parts }: Props) => {
  return (
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <div ref={provided.innerRef} className="border-2 border-red-500 h-96">
          {parts.map((p, i) => (
            <PartElement
              key={p.id}
              id={p.id}
              index={i}
              startTime={p.startTime}
              endTime={p.endTime}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PartList;
