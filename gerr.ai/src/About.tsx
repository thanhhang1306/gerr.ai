// src/App.tsx
import React from 'react';
import './About.css';

interface AboutProps {
    title: string;
    info: string;
 }
 
 const About: React.FC<AboutProps> = ({title, info }) => {

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 className="About">{title}</h1>
         <p className="About2">{info}</p>
    </div>
  );
}

export default About;
