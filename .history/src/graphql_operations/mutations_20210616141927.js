import { API, graphqlOperation } from "aws-amplify";
import { createOrder } from "../graphql/mutations";
import { authModes } from "../libs/constants";

export const _createOrder = async ({ eventId, tableId, userId, products }) => {
  try {
    const booking = await API.graphql({
      query: createOrder,
      variables: { input: { eventId, tableId, userId, products } },
    });
    return booking.data.createOrder;
  } catch (error) {
    return { error: error.message };
  }
};
