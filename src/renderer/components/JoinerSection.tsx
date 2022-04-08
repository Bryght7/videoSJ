import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Part from 'renderer/Part.type';
import PartList from './PartList';

type Props = {
  parts: Part[];
  onReorder: (result: DropResult) => void;
};

const JoinerSection = ({ parts, onReorder }: Props) => {
  const onDragEnd = (result: DropResult) => {
    onReorder(result);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <PartList parts={parts} />
    </DragDropContext>
  );
};

export default JoinerSection;
