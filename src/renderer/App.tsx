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
    setParts((oldParts) => [
      ...oldParts,
      { id: `id${Math.random().toString(16).slice(2)}`, startTime, endTime },
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

  return (
    <div className="flex justify-between h-screen">
      <main className="h-full p-4 w-max">
        <SplitterSection onSplit={handleOnSplit} />
      </main>
      <aside className="h-full w-80">
        <JoinerSection parts={parts} onReorder={handleOnReorder} />
      </aside>
    </div>
  );
};

export default App;
