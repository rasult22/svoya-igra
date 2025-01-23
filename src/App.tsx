import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from './AnimatedRoutes';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
