import { API, graphqlOperation } from "aws-amplify";
import { createOrder, updateOrder } from "../graphql/mutations";
import { authModes } from "../libs/constants";

export const _createOrder = async ({ eventId, tableId, userId, products }) => {
  try {
    const order = await API.graphql({
      query: createOrder,
      variables: { input: { eventId, tableId, userId, products } },
    });
    return order.data.createOrder;
  } catch (error) {
    return { error: error.message };
  }
};

export const _updateOrder = async ({ eventId, tableId, products, id, status, fulfilledAt }) => {
  try {
    const order = await API.graphql({
      query: updateOrder,
      variables: { input: { eventId, tableId, products, id, status, fulfilledAt } },
    });
    return order.data.updateOrder;
  } catch (error) {
    return { error: error.message };
  }
};
