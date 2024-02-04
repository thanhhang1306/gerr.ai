import React, { useState, useRef, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import Button from '@mui/material/Button';
import { Loader } from 'semantic-ui-react';
import { ClipLoader } from 'react-spinners';
import './CustomCanvasDraw.css';


const CustomCanvasDraw: React.FC = () => {
   const [brushColor, setBrushColor] = useState("#000000"); // Default color is black
   const [brushSize, setBrushSize] = useState(5); // Default brush size
   const [backgroundImage, setBackgroundImage] = useState(""); // State for background image URL
   const [key, setKey] = useState(Date.now());
   const [savedDrawing, setSavedDrawing] = useState("");
   const canvasRef = useRef<CanvasDraw>(null);
   const fileInputRef = useRef<HTMLInputElement>(null);
   const defaultColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#000000"]; // Rainbow colors
   const [loading, setLoading] = useState(false);
   const [processedImage, setProcessedImage] = useState("");
   const [textResponse, setTextResponse] = useState("");


   const handleEraserClick = () => setBrushColor("#FFFFFF");
   const clearCanvas = () => canvasRef.current?.clear();


   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = (e) => setBackgroundImage(e.target?.result as string);
         reader.readAsDataURL(file);
      }
      // reset the file input after uploading an image
      if (event.target && event.target.files) {
         event.target.value = '';
      }
   };

   const triggerFileInput = () => fileInputRef.current?.click();

   const removeBackgroundImage = () => {
      saveCurrentDrawing();
      setBackgroundImage("");
      setKey(Date.now());
   };

   const saveCurrentDrawing = () => {
      if (canvasRef.current) {
         const drawingData = canvasRef.current.getSaveData();
         setSavedDrawing(drawingData);
      }
   };

   const saveImage = () => {
      if (canvasRef.current) {
         const canvasDrawInstance: any = canvasRef.current;
         const dataUrl = canvasDrawInstance.getDataURL('image/png');
         const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
         console.log(dataUrl);
         setLoading(true);
         fetch('http://127.0.0.1:5000/upload_pic', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Data }),
         })
            .then(response => {
               if (response.ok) {
                  return response.json(); // Proceed to parse response as JSON only if response is OK
               } else {
                  console.error('Non-OK response status:', response.status);
                  response.text().then(text => console.log(text)); // Log the text of the response for debugging
                  throw new Error('Non-OK HTTP status');
               }
            })
            .then(data => {
               if (data.image && data.text_response) {
                  console.log('Image and text response received from the backend.');
                  
                  const lines = data.text_response.split('\n');

                  // Map over the lines and create a React element for each line
                  const renderedText = lines.map((line: string, index: number) => (
                     <React.Fragment key={index}>
                        {line}
                        <br />
                     </React.Fragment>
                  ));
                  setProcessedImage(data.image);
                  setTextResponse(renderedText);
                  setLoading(false);
               } else {
                  console.error('Failed to receive expected data from the backend.');
               }
            })
            .catch(error => {
               console.error('Error processing response from the backend:', error);
            });
      }
   };



   useEffect(() => {
      if (savedDrawing && canvasRef.current) {
         canvasRef.current.loadSaveData(savedDrawing, false); // false ensures the canvas is not cleared before loading the saved data
      }
   }, [backgroundImage, savedDrawing]);

   return (
      <div style={{ textAlign: "center", marginTop: "20px"}}>
         <h2> Draw the boundary of the district you would like to create </h2>
         <h3> Make sure to draw your boundary so that it is a closed loop 
            containing the center of the frame. </h3>
         <h3>To add an underlying map, 
            upload the image below.  </h3>
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
               key={key}
               ref={canvasRef}
               hideGrid
               enablePanAndZoom
               clampLinesToDocument
               canvasWidth={800}
               canvasHeight={600}
               brushColor={brushColor}
               brushRadius={brushSize}
               imgSrc={backgroundImage}
            />
         </div>
         <div style={{ maxWidth: "800px", margin: "20px auto", display: "flex", justifyContent: "center" }}>
            <Button
               variant="contained"
               color="primary"
               component="label"
               onClick={triggerFileInput}
               style={{ marginRight: "20px" }}
            >
               Upload Image
            </Button>
            <input
               type="file"
               accept="image/*"
               onChange={handleImageUpload}
               style={{ display: "none" }}
               ref={fileInputRef}
            />
            <Button
               variant="contained"
               color="primary"
               onClick={removeBackgroundImage}
               style={{ marginRight: "20px" }}
            >
               Remove Image
            </Button>
            <Button
               variant="contained"
               color="primary"
               onClick={clearCanvas}
               style={{ marginRight: "20px" }}
            >
               Clear Canvas
            </Button>
            <Button
               variant="contained"
               color="primary"
               onClick={saveImage}
            >
               Submit Image
            </Button>
         </div>
         <div>
            {(!loading) && processedImage && (
               <img src={`data:image/png;base64,${processedImage}`} alt="Processed Image" style={{ maxWidth: '100%' }} />
            )}
            {(!loading) && textResponse && (
               <div className='response-container'>
                  <p>District Analysis:</p>
                  <p>{textResponse}</p>
               </div>
            )}
            {loading && (
               <div className="loading-spinner">
               <ClipLoader color="#000" loading={loading} size={50} />
             </div>
            )}
         </div>

      </div>
   );
};

export default CustomCanvasDraw;