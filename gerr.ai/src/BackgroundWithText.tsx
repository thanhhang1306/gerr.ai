import React from 'react';
import './BackgroundWithText.css';

interface BackgroundWithTextProps {
   videoSource: string;
   text: string;
   desc: string;
}

const BackgroundWithText: React.FC<BackgroundWithTextProps> = ({ videoSource, text, desc }) => {
   return (
      <div className="background-container">
         <video autoPlay loop muted className="background-video">
            <source src={videoSource} type="video/mp4" />
            Your browser does not support the video tag.
         </video>
         <h1 className="overlay-text">{text}</h1>
         <p className="overlay-text">{desc}</p>
      </div>
   );
};

export default BackgroundWithText;
