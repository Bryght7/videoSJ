import { DragEvent, useState } from 'react';

type Props = {
  acceptedTypes?: string[];
  onDrop: (file: File) => void;
};

const DropZone = ({ acceptedTypes = undefined, onDrop }: Props) => {
  const [dragging, setDragging] = useState(false);

  const handleOnDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleOnDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setDragging(true);
  };

  const handleOnDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setDragging(false);
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    if (
      acceptedTypes === undefined ||
      acceptedTypes.includes(event.dataTransfer.files[0].type)
    ) {
      onDrop(event.dataTransfer.files[0]);
    }
  };

  return (
    <div
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragEnter={handleOnDragEnter}
      onDragLeave={handleOnDragLeave}
      className={`z-10 fixed w-[640px] h-[360px] opacity-60 ${
        dragging && 'bg-slate-600 border-dashed border-4 border-white'
      }`}
    />
  );
};

export default DropZone;
