import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartList from './PartList';

type Props = {
  parts: Part[];
  onReorder: (result: DropResult) => void;
  onDelete: (index: number) => void;
  onSplitJoin: () => void;
};

const JoinerSection = ({ parts, onReorder, onDelete, onSplitJoin }: Props) => {
  const onDragEnd = (result: DropResult) => {
    onReorder(result);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <PartList parts={parts} onDelete={onDelete} />
      </DragDropContext>
      <button
        className="w-full mt-1.5 h-[70px] btn btn-primary"
        type="button"
        disabled={parts.length < 1}
        onClick={() => onSplitJoin()}
      >
        Split & Join
      </button>
    </>
  );
};

export default JoinerSection;
