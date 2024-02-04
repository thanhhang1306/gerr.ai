// src/App.tsx
import React from 'react';
import './About.css';

interface AboutProps {
    title: string;
    info: string;
}

const About: React.FC<AboutProps> = ({ title, info }) => {

    return (

        <div style={
            {
                width: "80%", /* Adjust the width as needed */
                height: "675px", /* Adjust the height as needed */
                backgroundColor: "#e0e0e0", /* Set the background color */
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px", /* Center the box horizontally */
                marginBottom: "0px",
                marginLeft: "10%",
                paddingLeft: "20px",
                paddingTop: "-70px",
                paddingBottom: "60px",
                // display: "flex",
                // alignItems: "center",
                border: "2px solid black",
                // border: "2px solid black",
                // marginTop: "200px",
                // paddingTop: "0px",
                // lineHeight: "1",
                // maxWidth: "50%",
                // marginLeft: "450px",
                // justifyContent: "center",   
                // backgroundColor: "#F4EBE6",  
                // objectFit: "contain",
                // boxSizing: "border-box",
            }}>
            {/* <p> HI </p> */}
            <h1 className="About">{title}</h1>
            {/* <p style={{}} className="About">{title}</p>     */}
            <p className="About2">{info}</p>
        </div>

    );
}

export default About;
