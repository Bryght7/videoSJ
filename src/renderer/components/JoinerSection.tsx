import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartList from './PartList';

type Props = {
  parts: Part[];
  onReorder: (result: DropResult) => void;
  onDelete: (index: number) => void;
  onClick: (index: number) => void;
  onSplitJoin: () => void;
};

const JoinerSection = ({
  parts,
  onReorder,
  onDelete,
  onClick,
  onSplitJoin,
}: Props) => {
  const onDragEnd = (result: DropResult) => {
    onReorder(result);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <PartList parts={parts} onDelete={onDelete} onClick={onClick} />
      </DragDropContext>
      <button
        className="w-full mt-1.5 h-[90px] btn btn-primary"
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
