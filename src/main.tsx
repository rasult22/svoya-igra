/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createRoot } from 'react-dom/client';
import "@fontsource-variable/rubik"; // Defaults to wght axis
import "@fontsource-variable/rubik/wght.css"; // Specify axis
import "@fontsource-variable/rubik/wght-italic.css"; // Specify axis and style
import './index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
