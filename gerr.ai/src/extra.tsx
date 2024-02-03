import React from 'react';
import '../App.css';
import './extra.css';

const Extra: React.FC = () => {
    return(
        <div className='hero-container'>
            <video src='/images/video1.mp4'autoPlay loop muted />
        </div>
    );
}

export default Extra;