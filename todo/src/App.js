import { Toaster } from 'react-hot-toast';
import './App.css';
import { Home } from './components/Home';
import { Nav } from './components/Nav';
import { ModalContextProvider } from './context/ModalContext';

function App() {
  return (
    <div>
      <ModalContextProvider>
        <Nav/>
        <Home/>
        <Toaster/>
      </ModalContextProvider>
    </div>
  );
}

export default App;
