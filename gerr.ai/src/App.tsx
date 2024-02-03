// src/App.tsx
import React from 'react';
import './App.css';
import BackgroundWithText from './BackgroundWithText';
import Extra from './extra';
import CustomCanvasDraw from './CustomCanvasDraw';
import About from './About';

function App() {
  return (
    <div className="App">
      {/* <video src='/images/video1.mp4' autoPlay loop muted />
      <h1>gerr.ai</h1>
      <p>Let the Elections Begin</p> */}
      <BackgroundWithText videoSource="/images/video1.mp4" text="gerr.ai" desc="Let the election begin" />


      {/* Your app content */}
      {<CustomCanvasDraw />}
    </div >
  );
}

export default App;
