import icon from '../../assets/icon.svg';
import './App.css';
import 'tailwindcss/tailwind.css';
import SplitterSection from './components/SplitterSection';

const App = () => {
  return (
    <div className="flex justify-between h-screen">
      <main className="h-full p-4 w-max">
        <SplitterSection />
      </main>
      <aside className="h-full w-80">02ddd</aside>
    </div>
  );
};

export default App;
