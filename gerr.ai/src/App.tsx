// src/App.tsx
import React from 'react';
import './App.css';
import BackgroundWithText from './BackgroundWithText';
import CustomCanvasDraw from './CustomCanvasDraw';

function App() {
  return (
    <div className="App">
      <BackgroundWithText backgroundImage={`${process.env.PUBLIC_URL}/images/background.jpeg`} text="gerr.ai" />
      {/* Your app content */}
      <CustomCanvasDraw />
      <p> Hi </p>
    </div>
  );
}

export default App;
