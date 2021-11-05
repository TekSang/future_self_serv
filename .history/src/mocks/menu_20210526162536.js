import faker from "faker";
import _ from "lodash";

const categories = ["Soft Drinks", "Hot Drinks", "Beer", "Wine", "Liquor"];

const createItem = () => ({
  name: faker.commerce.productName(),
  id: faker.datatype.uuid(),
});

const createRow = () => ({
  id: faker.datatype.uuid(),
  category: _.sample(categories),
  items: Array.from(Array(Math.round(1 + Math.random() * 10)).keys()).map((x) => createItem()),
});

export const r = (qty = 30) => {
  let data = [];

  for (let i = 0; i < qty; i++) {
    const row = createRow();
    data.push(row);
  }

  return data;
};

console.log(resizeTo);

export const menu = [
  {
    id: "df394ri3fn",
    category: "Soft Drinks",
    items: [
      {
        name: "Fanta",
        id: "ffwe3r3r3fw",
      },
      {
        name: "Coca Cola",
        id: "ffwefwfedf",
      },
      {
        name: "Orange Juice",
        id: "ffwefefefw",
      },
      {
        name: "Still Water",
        id: "ffwsfvsvsefw",
      },
      {
        name: "Gas Water",
        id: "dsmf348f",
      },
    ],
  },
  {
    id: "wjefkw48ujf9w",
    category: "Warm Drinks",
    items: [
      {
        name: "Coffee",
        id: "ffwsefsvefw",
      },
      {
        name: "Tea",
        id: "984r3ogifn3eo",
      },
    ],
  },
  {
    id: "o8fjowifnow",
    category: "Alcoholic Drinks",
    items: [
      {
        name: "Leffe",
        id: "ffwesvssfw",
      },
      {
        name: "Jupiler",
        id: "ffsvsdcswefw",
      },
      {
        name: "Red Wine",
        id: "ffefvsdvswefw",
      },
      {
        name: "White Wine",
        id: "ffsefsvswefw",
      },
      {
        name: "Bernad Massard",
        id: "ffsefsvscsdfwefw",
      },
      {
        name: "Porto",
        id: "ffsffsve3rfwefw",
      },
    ],
  },
];
