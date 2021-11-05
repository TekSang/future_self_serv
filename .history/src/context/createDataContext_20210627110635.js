import React, { useReducer, createContext, useEffect } from "react";
import { PAGES } from "../libs/constants";

const pageArray = Object.keys(PAGES).map((x) => PAGES[x].path);

const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      if (pageArray.includes(state.currentPage)) console.log("STATE", state);
    }, [state]);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
export default createDataContext;
