import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/core/styles";

import useWindowSize from "../hooks/useWindowSize";
import { tables } from "../mocks/tables";
import Rect from "./shapes/Rectangle";

const useStyles = makeStyles((theme) => ({
  svg: {
    border: `1px solid rgba(0,0,0,1)`,
  },
}));

/* Component */
export const MyD3Component = (props) => {
  const { height, width } = useWindowSize();
  const cHeight = Math.min(width, height) * 0.95;
  const cWidth = cHeight;
  const classes = useStyles();

  /* The useRef Hook creates a variable that "holds on" to a value across rendering
       passes. In this case it will hold our component's SVG DOM element. It's
       initialized null and React will assign it later (see the return statement) */
  const d3Container = useRef(null);

  /* The useEffect Hook is for running side effects outside of React,
       for instance inserting elements into the DOM using D3 */
  useEffect(
    () => {
      if (props.data && d3Container.current) {
        const svg = d3.select(d3Container.current);
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data]
  );

  return (
    <svg className={classes.svg} width={cWidth} height={cHeight} ref={d3Container}>
      {props.data.map((d, i) => {
        return <Rect x={50 * i + 5} y={50} width={50} height={50} />;
      })}
    </svg>
  );
};

/* App */
const Canvas = () => {
  return (
    <div className="my-app">
      <MyD3Component data={tables} />
    </div>
  );
};

export default Canvas;
