import { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  const canvasRef = useRef(null);
  const [size, setSize] = useState(10);
  const [color, setColor] = useState("black");
  const [isPressed, setIsPressed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.8;

    let x, y;

    const drawCircle = () => {
      ctx.beginPath();
      ctx.arc(position.x, position.y, size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawLine = () => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(position.x, position.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = size * 2;
      ctx.stroke();
    };

    const startDrawing = (e) => {
      setIsPressed(true);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const stopDrawing = () => {
      setIsPressed(false);
      x = undefined;
      y = undefined;
    };

    const draw = (e) => {
      if (!isPressed) return;

      x = position.x;
      y = position.y;
      setPosition({ x: e.clientX, y: e.clientY });

      drawCircle();
      drawLine();
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", draw);
    };
  }, [color, isPressed, position, size]);

  const increaseSize = () =>
    setSize((prevSize) => (prevSize >= 50 ? 50 : prevSize + 5));

  const decreaseSize = () =>
    setSize((prevSize) => (prevSize <= 5 ? 5 : prevSize - 5));

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas ref={canvasRef} />
      <div className="toolbox">
        <button onClick={decreaseSize}>-</button>
        <span id="size">{size}</span>
        <button onClick={increaseSize}>+</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <button onClick={clearCanvas}>X</button>
      </div>
    </div>
  );
};

export default App;
