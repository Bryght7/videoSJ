import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import icon from '../../assets/icon.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import SplitterSection from './components/SplitterSection';
import Part from './Part.type';
import JoinerSection from './components/JoinerSection';

const reorder = (list: Part[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = () => {
  const [parts, setParts] = useState<Part[]>([]);

  const handleOnSplit = (startTime: number, endTime: number) => {
    let bgColor: string;
    switch (parts.length % 7) {
      case 0:
        bgColor = 'bg-red-300';
        break;
      case 1:
        bgColor = 'bg-green-300';
        break;
      case 2:
        bgColor = 'bg-violet-300';
        break;
      case 3:
        bgColor = 'bg-orange-300';
        break;
      case 4:
        bgColor = 'bg-pink-300';
        break;
      case 5:
        bgColor = 'bg-yellow-300';
        break;
      case 6:
        bgColor = 'bg-blue-300';
        break;
      default:
        bgColor = 'bg-stone-300';
    }

    setParts((oldParts) => [
      ...oldParts,
      {
        id: `id${Math.random().toString(16).slice(2)}`,
        startTime,
        endTime,
        bgColor,
      },
    ]);
  };

  const handleOnReorder = (result: DropResult) => {
    if (!result.destination) {
      // if dropped outside of droppable zone
      return;
    }
    if (result.destination.index === result.source.index) {
      // if didn't change order
      return;
    }
    // otherwise, change order
    const newParts = reorder(
      parts,
      result.source.index,
      result.destination.index
    );
    setParts(newParts);
  };

  const handleOnDelete = (index: number) => {
    const newParts = [...parts]; // copy
    newParts.splice(index, 1);
    setParts(newParts);
  };

  return (
    <div className="flex justify-between h-screen">
      <main className="h-full px-4 pt-4 w-max">
        <SplitterSection onSplit={handleOnSplit} />
      </main>
      <aside className="w-full h-full pt-4 pr-4">
        <JoinerSection
          parts={parts}
          onReorder={handleOnReorder}
          onDelete={handleOnDelete}
        />
      </aside>
    </div>
  );
};

export default App;
