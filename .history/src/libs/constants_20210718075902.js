import { conformsTo } from "lodash-es";

export const COLORS = {
  black: "#282c34",
  white: "#ECEBE7",
  porcelain: "#ddded9",
  olive: "#566e2d",
  tusk: "#eff3c4",
  orange: "#F76B1C",
  redLight: "#FE6B8B",
  redDark: "#FF8E53",
  yellowLight: "#FFEB01",
  yellowDark: "#FFB600",
  greenLight: "#00AD4C",
  greenDark: "#B3D236",
};

export const ORDER_STATUS = {
  INLINE: "INLINE",
  IN_PROGRESS: "IN_PROGRESS",
  CHOOSING: "CHOOSING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
};

export const PAGES = {
  home: { path: "/", french: "Accueil", english: "Home" },
  menu: { path: "/menu", french: "Le Menu", english: "Menu" },
  guestList: { path: "/guestlist", french: "Les Invités", english: "Guest List" },
  schedule: { path: "/schedule", french: "Horaire", english: "Schedule" },
  bar: { path: "/bar", french: "Bar", english: "Bar" },
};

export const previewButtonType = {
  SEND: "SEND",
  EDIT: "EDIT",
};

export const localStorageItems = {
  state: "WEDDING_STATE",
};

export const isEqual = (obj1, obj2) => {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }
  for (let objKey of obj1Keys) {
    if (obj1[objKey] !== obj2[objKey]) {
      if (typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
        if (!isEqual(obj1[objKey], obj2[objKey])) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
};

export const LAST_SIGN_IN = "lastSignIn";
export const VALID_PERIOD = 1000 * 60 * 60 * 8; // was 24 but was changed to 8

export const hasExpired = Date.now() - localStorage.getItem(LAST_SIGN_IN) > VALID_PERIOD;

export const capitalizeEveryFirstLetter = (mySentence) => {
  if (typeof mySentence === "string") {
    return mySentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  } else {
    return mySentence;
  }
};

export const priorityColors = ["#B8336A", "#A0D2DB", "#C490D1", "#0E103D", "#1F0318", "#183A37", "#35A7FF"];

export const coupleName = "Félicité & Mandela";

const localState = JSON.parse(localStorage.getItem(localStorageItems.state));
export const defaultState = {
  order: { id: "", products: [], status: ORDER_STATUS.CHOOSING },
  currentPage: PAGES.home.path,
  event: {},
  user: {},
  table: {},
  products: [],
  localOrders: [],
  switchApps: false,
  tableIds: [],
  barOrders: [],
  fetchOrders: [],
  orderAction: false,
  updateLocalOrder: false,
};

export const EnableStatus = {
  TRUE: "TRUE",
  FALSE: "FALSE",
  BOTH: "BOTH",
};

export const ORDER_ACTIONS = {
  CREATE_ORDER: "CREATE_ORDER",
  UPDATE_ORDER_QUANTITIES: "UPDATE_ORDER_QUANTITIES",
  CANCEL_ORDER: "CANCEL_ORDER",
  UPDATE_ORDER_TO_CHOOSING: "UPDATE_ORDER_TO_CHOOSING",
  RESET_ORDERS: "RESET_ORDERS",
};

export const authModes = {
  API_KEY: "API_KEY",
  AWS_IAM: "AWS_IAM",
  OPENID_CONNECT: "OPENID_CONNECT",
  AMAZON_COGNITO_USER_POOLS: "AMAZON_COGNITO_USER_POOLS",
};

export const INITIAL_STATE = localState
  ? hasExpired
    ? defaultState
    : { ...defaultState, event: localState.event, user: localState.user, table: localState.table }
  : defaultState;
