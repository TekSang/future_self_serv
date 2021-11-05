import React, { useReducer, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { pathname } = useLocation();

    useEffect(() => {
      console.log("STATE", state);
      console.log(pathname);
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
