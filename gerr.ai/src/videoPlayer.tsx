import React, { useState, ChangeEvent } from "react";

const Video: React.FC = () => {
  const [src, setSrc] = useState<string | ArrayBuffer | null>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      // Get the uploaded file
      const file = event.target.files?.[0];

      if (file) {
        // Transform file into blob URL
        setSrc(URL.createObjectURL(file));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <video src={src as string} controls width="100%">
        Sorry, your browser doesn't support embedded videos.
      </video>
      <input type="file" onChange={handleChange} />
    </>
  );
}

export default Video;
