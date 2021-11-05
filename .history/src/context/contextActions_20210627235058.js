import createDataContext from "./createDataContext";
import contextReducer from "./contextReducer";
import { INITIAL_STATE } from "../libs/constants";

const setOrder = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_order", payload: data });
  };
};

const setOrderStatus = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_order_status", payload: data });
  };
};

const setCurrentPage = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_current_page", payload: data });
  };
};

const setEvent = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_event", payload: data });
  };
};

const setUser = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_user", payload: data });
  };
};

const setTable = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_table", payload: data });
  };
};

const setProducts = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_products", payload: data });
  };
};

const setLocalOrders = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_local_orders", payload: data });
  };
};

const setSwitchApps = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_switch_apps", payload: data });
  };
};

const setAllTableIds = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_table_ids", payload: data });
  };
};

const setBarOrders = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_bar_orders", payload: data });
  };
};

const setFetchOrders = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_fetch_orders", payload: data });
  };
};

const setOrderAction = (dispatch) => {
  return (data) => {
    dispatch({ type: "set_order_action", payload: data });
  };
};

const toggleUpdateLocalOrder = (dispatch) => {
  return (data) => {
    dispatch({ type: "toggle_update_local_order", payload: data });
  };
};

export const { Context, Provider } = createDataContext(
  contextReducer,
  {
    toggleUpdateLocalOrder,
    setOrderAction,
    setFetchOrders,
    setBarOrders,
    setAllTableIds,
    setTable,
    setOrder,
    setCurrentPage,
    setOrderStatus,
    setEvent,
    setUser,
    setProducts,
    setLocalOrders,
    setSwitchApps,
  },
  INITIAL_STATE
);
