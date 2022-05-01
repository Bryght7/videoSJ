import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import './App.css';
import 'tailwindcss/tailwind.css';
import SplitterSection from './components/SplitterSection';
import Part from './Part.type';
import JoinerSection from './components/JoinerSection';
import ModalWork from './components/ModalWork';

const reorder = (list: Part[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [parts, setParts] = useState<Part[]>([]);
  const [showingModal, setShowingModal] = useState(false);
  const [working, setWorking] = useState(false);
  const [successWork, setSuccessWork] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState<string>('');
  const [outputFilePath, setOutputFilePath] = useState<string>('');
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true' || false
  );
  const [loadTimestamp, setLoadTimestamp] = useState(0);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    window.api.menuToggleDarkMode(() => {
      setDarkMode((prevToggle) => !prevToggle);
    });
    // using [] to execute only once
  }, []);

  const handleOnSplit = (startTime: number, endTime: number) => {
    const oldParts = parts.map((p) => {
      p.active = false; // disactivate all parts
      return p;
    });
    setParts([
      ...oldParts,
      {
        id: `id${Math.random().toString(16).slice(2)}`,
        startTime,
        endTime,
        active: true, // newly added part is active
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

  const handleOnPartDelete = (index: number) => {
    const newParts = [...parts]; // copy
    newParts.splice(index, 1);
    setParts(newParts);
  };

  const handleOnPartClick = (index: number) => {
    const newParts = parts.map((p, i) => {
      p.active = index === i;
      return p;
    });
    setParts(newParts);
    /* Didn't feel like lifting all "played" state up here...
     so I send the value down to SplitterSection to trigger seeking
     and I add a negligible random epsilon number to force trigger
     the useEffect when clicking several times on the same part */
    setLoadTimestamp(
      parts[index].startTime + (Math.random() * (0.00002 - 0.00001) + 0.00002)
    );
  };

  const handleOnVideoLoad = (filePath: string) => {
    setVideoUrl(`vsj://${filePath}`);
    setParts([]);
    document.title = `VideoSJ - ${filePath.replace(/^.*[\\/]/, '')}`;
  };

  const handleOnSplitJoin = async () => {
    const outputFilePathTmp = await window.api.saveFileDialog();
    if (outputFilePathTmp) {
      setOutputFilePath(outputFilePathTmp);
      const start = performance.now();
      setWorking(true);
      setShowingModal(true);
      const inputFilePath = await window.api.createInputFile(videoUrl, parts);
      if (inputFilePath) {
        const doneWork = await window.api.splitJoin(outputFilePathTmp);
        const end = performance.now();
        setSecondsElapsed(((end - start) / 1000).toFixed(2));
        setSuccessWork(doneWork);
        setWorking(false);
      }
    }
  };

  const handleOnCloseModal = async (reason?: string) => {
    switch (reason) {
      case 'openOutputDir':
        setShowingModal(false);
        window.api.openOutputDir(outputFilePath);
        break;
      default:
        setShowingModal(false);
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex justify-between h-screen dark:bg-zinc-800">
        {showingModal && (
          <ModalWork
            working={working}
            successWork={successWork}
            secondsElapsed={secondsElapsed}
            onClose={handleOnCloseModal}
          />
        )}
        <main className="h-full px-4 pt-4 w-max">
          <SplitterSection
            videoUrl={videoUrl}
            loadTimestamp={loadTimestamp}
            parts={parts}
            onSplit={handleOnSplit}
            onVideoLoad={handleOnVideoLoad}
          />
        </main>
        <aside className="w-full h-full pt-4 pr-4">
          <JoinerSection
            parts={parts}
            onReorder={handleOnReorder}
            onDelete={handleOnPartDelete}
            onClick={handleOnPartClick}
            onSplitJoin={handleOnSplitJoin}
          />
        </aside>
      </div>
    </div>
  );
};

export default App;
