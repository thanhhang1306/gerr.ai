// src/BackgroundWithText.tsx
import React from 'react';
import './BackgroundWithText.css';

interface BackgroundWithTextProps {
   backgroundImage: string;
   text: string;
}

const BackgroundWithText: React.FC<BackgroundWithTextProps> = ({ backgroundImage, text }) => {
   return (
      <div className="background-container">
         <div className="blurred-background" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
         <h1 className="overlay-text">{text}</h1>
      </div>
   );
};

export default BackgroundWithText;
