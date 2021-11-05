import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { makeStyles } from "@material-ui/core/styles";

import useWindowSize from "../hooks/useWindowSize";
import { tables } from "../mocks/tables";

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

        // Bind D3 data
        const update = svg.append("g").selectAll("text").data(props.data);

        // Enter new D3 elements
        update
          .enter()
          .append("text")
          .attr("x", (d, i) => i * 1000 * Math.random())
          .attr("y", (d, i) => i * 1000 * Math.random())
          .style("font-size", 24)
          .text((d) => d);

        // Update existing D3 elements
        update.attr("x", (d, i) => i * 40).text((d) => d);

        // Remove old D3 elements
        update.exit().remove();
      }
    },

    /*
            useEffect has a dependency array (below). It's a list of dependency
            variables for this useEffect block. The block will run after mount
            and whenever any of these variables change. We still have to check
            if the variables are valid, but we do not have to compare old props
            to next props to decide whether to rerender.
        */
    [props.data, d3Container.current]
  );

  return <svg className={classes.svg} width={cWidth} height={cHeight} ref={d3Container} />;
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
