import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
export default function Rectangle(props) {
  const d3Container = useRef(null);

  useEffect(
    () => {
      if (props) {
        const rect = d3.select(d3Container.current);
        //handleDrag(d3.select(rect));
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

  console.log(d3);

  /*   const handleDrag = d3
    .drag()
    .subject(function () {
      const me = d3.select(d3Container.current);
      return { x: me.attr("x"), y: me.attr("y") };
    })
    .on("drag", function () {
      const me = d3.select(d3Container.current);
      me.attr("x", d3.event.x);
      me.attr("y", d3.event.y);
    }); */

  return <rect {...props} />;
}
