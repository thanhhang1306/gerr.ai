import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";

const CustomCanvasDraw: React.FC = () => {
   const [showUI, setShowUI] = useState(true);
   const [canvasData, setCanvasData] = useState("");
   const [brushColor, setBrushColor] = useState("#000000"); // Default color is black
   const canvasRef = useRef<CanvasDraw>(null);

   // Define the default colors
   const defaultColors = ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#EE82EE", "#000000", "#FFFFFF"];

   const toggleUI = () => setShowUI(!showUI);

   const saveDrawing = () => {
      if (canvasRef.current) {
         const savedData = canvasRef.current.getSaveData();
         setCanvasData(savedData);
         console.log("Drawing saved", savedData);
      }
   };

   const loadDrawing = () => {
      if (canvasRef.current) {
         canvasRef.current.loadSaveData(canvasData, false);
         console.log("Drawing loaded");
      }
   };

   return (
      <div>
         {showUI && (
            <div>
               {/* <button onClick={toggleUI}>Toggle UI</button>
               <button onClick={saveDrawing}>Save</button>
               <button onClick={loadDrawing}>Load</button> */}
               <div style={{ margin: "10px 0", display: "flex", justifyContent: "center", border: "2px solid black", padding: "10px" }}>
                  {defaultColors.map((color) => (
                     <div
                        key={color}
                        onClick={() => setBrushColor(color)}
                        style={{
                           backgroundColor: color,
                           width: "40px",
                           height: "40px",
                           margin: "0 10px",
                           border: "2px solid black",
                           cursor: "pointer"
                        }}
                     />
                  ))}
                  <input
                     type="color"
                     value={brushColor}
                     onChange={(e) => setBrushColor(e.target.value)}
                     style={{ margin: '0 5px' }}
                  />
               </div>
            </div>
         )}
         <div style={{ border: "2px solid black", margin: "20px auto" }}>
            <CanvasDraw
               ref={canvasRef}
               hideGrid
               canvasWidth={window.innerWidth}
               canvasHeight={600}
               brushColor={brushColor} // Use the selected color for the brush
               style={{ background: "white" }}
            />
         </div>
      </div>
   );
};

export default CustomCanvasDraw;
