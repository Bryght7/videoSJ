import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartList from './PartList';

type Props = {
  parts: Part[];
  onReorder: (result: DropResult) => void;
  onDelete: (index: number) => void;
};

const JoinerSection = ({ parts, onReorder, onDelete }: Props) => {
  const onDragEnd = (result: DropResult) => {
    onReorder(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PartList parts={parts} onDelete={onDelete} />
    </DragDropContext>
  );
};

export default JoinerSection;
