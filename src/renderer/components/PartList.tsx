import { Droppable } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartElement from './PartElement';

type Props = {
  parts: Part[];
  onDelete: (index: number) => void;
  onClick: (index: number) => void;
};

const PartList = ({ parts, onDelete, onClick }: Props) => {
  return (
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <div
          ref={provided.innerRef}
          className="h-[360px] overflow-y-scroll space-y-2 pr-1"
        >
          {parts.map((p, i) => (
            <PartElement
              key={p.id}
              index={i}
              onDelete={onDelete}
              onClick={onClick}
              part={p}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PartList;
