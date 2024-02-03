import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

const CustomCanvasDraw: React.FC = () => {
   const [showUI, setShowUI] = useState(true);
   const [canvasData, setCanvasData] = useState("");
   const [brushColor, setBrushColor] = useState("#000000");
   const canvasRef = useRef<CanvasDraw>(null);

   const defaultColors = ["#FF0000", "#FF7F00", "#FFFF00", "#00FF00", "#0000FF", "#4B0082", "#9400D3", "#000000"]; // Rainbow colors

   const toggleUI = () => setShowUI(!showUI);
   const saveDrawing = () => {/* Save drawing logic */ };
   const loadDrawing = () => {/* Load drawing logic */ };
   const handleEraserClick = () => {
      if (canvasRef.current) {
         setBrushColor("#FFFFFF");
      }
   };

   return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
         {showUI && (
            <>
               <div style={{ marginBottom: "10px" }}>
                  <button onClick={toggleUI} style={{ marginRight: "8px" }}>Toggle UI</button>
                  <button onClick={saveDrawing} style={{ marginRight: "8px" }}>Save</button>
                  <button onClick={loadDrawing} style={{ marginRight: "8px" }}>Load</button>
               </div>
               <div style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px solid black",
                  padding: "10px",
                  maxWidth: "780px",
                  margin: "auto"
               }}>
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
                  <AutoFixNormalIcon onClick={handleEraserClick} style={{ color: 'black', cursor: 'pointer', margin: '0 10px' }} /> {/* Eraser Icon */}
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
                     canvasWidth={800}
                     canvasHeight={600}
                     brushColor={brushColor}
                  />
               </div>
            </>
         )}
      </div>
   );
};

export default CustomCanvasDraw;
