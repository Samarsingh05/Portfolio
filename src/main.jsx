import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * Entry point for the portfolio application
 * Renders the App component into the root DOM element
 */
createRoot(document.getElementById('root')).render(<App />);
