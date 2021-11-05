//import _ from "lodash";
import { localStorageItems, LAST_SIGN_IN, defaultState } from "../libs/constants";

const contextReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "set_order":
      newState = { ...state, order: action.payload };
      break;
    case "set_current_page":
      newState = { ...state, currentPage: action.payload };
      break;
    case "set_order_status":
      newState = { ...state, order: { ...state.order, status: action.payload } };
      break;
    case "set_event":
      newState = { ...state, event: action.payload };
      break;
    case "set_table":
      newState = { ...state, table: action.payload };
      break;
    case "set_user":
      newState = { ...state, user: action.payload };
      break;
    case "set_products":
      newState = { ...state, products: action.payload };
      break;
    case "set_local_orders":
      newState = { ...state, localOrders: action.payload };
      break;
    case "set_switch_apps":
      newState = { ...state, switchApps: action.payload };
      break;
    case "set_table_ids":
      newState = { ...state, tableIds: action.payload };
      break;
    case "set_bar_orders":
      newState = { ...state, barOrders: action.payload };
      break;
    case "set_fetch_orders":
      newState = { ...state, fetchOrders: action.payload };
      break;
    default:
      newState = state;
      break;
  }

  localStorage.setItem(LAST_SIGN_IN, Date.now());

  localStorage.removeItem(localStorageItems.state);
  localStorage.setItem(localStorageItems.state, JSON.stringify({ event: newState.event, user: newState.user }));

  return newState;
};

export default contextReducer;
