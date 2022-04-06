import { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import SplitterSection from './components/SplitterSection';
import Part from './Part.type';

const App = () => {
  const [parts, setParts] = useState<Part[]>([]);

  const handleOnSplit = (startTime: number, endTime: number) => {
    setParts((oldParts) => [...oldParts, { startTime, endTime }]);
    // TODO:LATEST do the parts section with the list of parts
  };

  return (
    <div className="flex justify-between h-screen">
      <main className="h-full p-4 w-max">
        <SplitterSection onSplit={handleOnSplit} />
      </main>
      <aside className="h-full w-80">Right section</aside>
    </div>
  );
};

export default App;
