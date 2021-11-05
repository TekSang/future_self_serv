import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function Rectangle(props) {
  const d3Container = useRef(null);

  useEffect(
    () => {
      if (props) {
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
    [props]
  );

  return <rect {...props} />;
}
