import faker from "faker";
// creates a list of fake guests
function getGuests(num) {
  const guests = [];
  for (let i = 0; i < num; i++) {
    guests.push({
      name: faker.name.findName(),
      table: "Table " + Math.round(Math.random() * 50),
    });
  }

  return guests;
}

export const guests = getGuests(1000);
