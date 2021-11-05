import React, { useReducer, createContext /* useEffect */ } from "react";
/* import { _updateUser } from "../graphql_operations/mutations";
import { PAGES } from "../libs/constants";

const pageArray = Object.keys(PAGES).map((x) => PAGES[x].path); */

const createDataContext = (reducer, actions, initialState) => {
  const Context = createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const boundActions = {};
    /*
    useEffect(() => {
      console.log(state);
      if (pageArray.includes(state.currentPage) && state.user && state.switchApps === false) {
        let userState = JSON.stringify({
          currentPage: state.currentPage,
          order: state.order,
          lastLogin: new Date().toJSON(),
        });
        updateUser({
          id: state.user.id,
          userState,
        }); 
      }
    }, [state]);

         async function updateUser({ id, userState }) {
      try {
        await _updateUser({ id, userState });
      } catch (error) {
        console.log(error);
      }
    } */

    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};
export default createDataContext;
