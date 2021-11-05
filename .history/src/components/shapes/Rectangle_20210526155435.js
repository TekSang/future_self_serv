import React, { useRef, useState } from "react";
const Rect = (props) => {
  const [position, setPosition] = useState({ x: 50, y: 50, coords: {} });

  const handleMouseMove = useRef((e) => {
    setPosition((position) => {
      const xDiff = position.coords.x - e.pageX;
      const yDiff = position.coords.y - e.pageY;
      return {
        x: position.x - xDiff,
        y: position.y - yDiff,
        coords: {
          x: e.pageX,
          y: e.pageY,
        },
      };
    });
  });

  const handleMouseDown = (e) => {
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition((position) =>
      Object.assign({}, position, {
        coords: {
          x: pageX,
          y: pageY,
        },
      })
    );
    document.addEventListener("mousemove", handleMouseMove.current);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove.current);
    setPosition((position) => Object.assign({}, position, { coords: {} }));
  };

  return (
    <rect
      x={position.x}
      y={position.y}
      fill="black"
      stroke="black"
      strokeWidth="1"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    />
  );
};

export default Rect;
