import React, { useRef, useState } from "react";
const Circle = (props) => {
  const [position, setPosition] = useState({ x: props.x, y: props.y, coords: {} });

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
    <circle
      cx={position.x}
      cy={position.y}
      r={30}
      fill="black"
      stroke="black"
      strokeWidth="1"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...props}
    />
  );
};

export default Circle;
