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
    console.log(error);
    return { error: error.message };
  }
};

export const _updateOrder = async ({ eventId, tableId, products, id, status, fulfilledAt }) => {
  let params = {};
  if (products) {
    params = { ...params, products };
  }
  if (status) {
    params = { ...params, status };
  }

  if (fulfilledAt) {
    params = { ...params, fulfilledAt };
  }

  try {
    const order = await API.graphql({
      query: updateOrder,
      variables: { input: { eventId, tableId, id, ...params } },
    });
    console.log("🚀 ~ file: mutations.js ~ line 25 ~ const_updateOrder= ~ order", order);
    return order.data.updateOrder;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
