// src/App.tsx
import React from 'react';
import './About.css';

interface AboutProps {
    title: string;
    info: string;
 }
 
 const About: React.FC<AboutProps> = ({title, info }) => {

  return (

             <div style={{
                display: "flex",
                alignItems: "center",
                border: "2px solid black",
                padding: "50px",
                maxWidth: "50%",
                margin: "0 auto",     
                backgroundColor: "#F4EBE6",  
                objectFit: "contain",
                boxSizing: "border-box",
             }}>  
                 <h1 className="About">{title}</h1>
             <p style={{ margin: '5 30px' }} className="About2">{info}</p>
             </div>
    
  );
}

export default About;
