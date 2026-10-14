import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { DbProvider } from './data/DbContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <DbProvider>
    <App />
  </DbProvider>
);
