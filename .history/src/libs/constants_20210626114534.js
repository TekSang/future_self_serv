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
  home: "Home",
  menu: "Menu",
  guestList: "Guest List",
  schedule: "Today´s Schedule",
  bar: "Bar",
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
export const DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

export const isOrderThan24Hours = Date.now() - localStorage.getItem(LAST_SIGN_IN) > DAY_IN_MILLIS;

export const capitalizeEveryFirstLetter = (mySentence) => {
  if (typeof mySentence === "string") {
    return mySentence.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
  } else {
    return mySentence;
  }
};

const localState = JSON.parse(localStorage.getItem(localStorageItems.state));
export const defaultState = {
  order: { id: "", products: [], status: ORDER_STATUS.CHOOSING },
  currentPage: PAGES.home,
  event: null,
  user: null,
  table: null,
  products: [],
  localOrders: [],
  switchApps: false,
  tableIds: [],
  barOrders: [],
};

export const authModes = {
  API_KEY: "API_KEY",
  AWS_IAM: "AWS_IAM",
  OPENID_CONNECT: "OPENID_CONNECT",
  AMAZON_COGNITO_USER_POOLS: "AMAZON_COGNITO_USER_POOLS",
};

export const INITIAL_STATE = localState ? (isOrderThan24Hours ? defaultState : localState) : defaultState;
