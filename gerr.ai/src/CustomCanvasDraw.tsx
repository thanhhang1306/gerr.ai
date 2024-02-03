import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import Button from '@mui/material/Button';

const CustomCanvasDraw: React.FC = () => {
   const [brushColor, setBrushColor] = useState("#000000"); // Default color is black
   const [brushSize, setBrushSize] = useState(5); // Default brush size
   const canvasRef = useRef<CanvasDraw>(null);

   const defaultColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#000000"]; // Rainbow colors

   const handleEraserClick = () => setBrushColor("#FFFFFF");

   const clearCanvas = () => {
      canvasRef.current?.clear();
   };

   const saveImage = () => {
      // Get canvas drawing as data URL (PNG format by default)
      if (canvasRef.current) {
         // Using 'any' type to bypass TypeScript error. Consider extending the CanvasDraw type for a more robust solution.
         const canvasDrawInstance: any = canvasRef.current;
         const dataUrl = canvasDrawInstance.getDataURL('image/png');
         console.log(dataUrl);
         // You can now proceed with further actions, such as sending the dataUrl to a backend server
      }

      // Optional: Convert Data URL to Blob if your backend requires a file upload
      // const blob = await (await fetch(dataUrl)).blob();

      // Use Fetch API or Axios to send the image data to your backend
      // Example with fetch and assuming your backend endpoint is '/api/upload' and expects a form-data
      /*
      const formData = new FormData();
      formData.append('image', blob, 'drawing.png');
      fetch('/api/upload', {
          method: 'POST',
          body: formData,
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
      */

   };



   return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>

         <>
            <div style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               border: "2px solid black",
               padding: "10px",
               maxWidth: "780px",
               margin: "auto"
            }}>
               <label style={{ margin: '0 10px' }}>
                  Brush Size:
                  <input
                     type="range"
                     min="1"
                     max="20"
                     value={brushSize}
                     onChange={(e) => setBrushSize(parseInt(e.target.value))}
                     style={{ margin: '0 10px' }}
                  />
               </label>
               {defaultColors.map(color => (
                  <div
                     key={color}
                     onClick={() => setBrushColor(color)}
                     style={{
                        backgroundColor: color,
                        width: "30px",
                        height: "30px",
                        margin: "0 10px",
                        cursor: "pointer"
                     }}
                  />
               ))}
               <AutoFixNormalIcon onClick={handleEraserClick} style={{ color: 'black', cursor: 'pointer', margin: '0 10px' }} />
               <input
                  type="color"
                  value={brushColor}
                  onChange={(e) => setBrushColor(e.target.value)}
                  style={{ marginLeft: "10px" }}
               />
            </div>
            <div style={{ border: "2px solid black", margin: "20px auto", display: "inline-block" }}>
               <CanvasDraw
                  ref={canvasRef}
                  hideGrid
                  enablePanAndZoom
                  clampLinesToDocument
                  canvasWidth={800}
                  canvasHeight={600}
                  brushColor={brushColor}
                  brushRadius={brushSize}
               />
            </div>
            <div style={{ maxWidth: "800px", margin: "20px auto", display: "flex", justifyContent: "center" }}>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={clearCanvas}
                  style={{ marginRight: "20px" }} // Increase spacing by adding marginRight
               >
                  Clear Canvas
               </Button>

               <Button
                  variant="contained"
                  color="primary"
                  onClick={saveImage}
               >
                  Save Image
               </Button>
            </div>

         </>
      </div>
   );
};

export default CustomCanvasDraw;
