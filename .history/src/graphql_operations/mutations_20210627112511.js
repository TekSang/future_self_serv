import { API } from "aws-amplify";
import { createOrder, updateOrder, updateUser } from "../graphql/mutations";
import { authModes } from "../libs/constants";

export const _createOrder = async ({ eventId, tableId, userId, products }) => {
  try {
    const order = await API.graphql({
      query: createOrder,
      variables: { input: { eventId, tableId, userId, products } },
      authMode: authModes.AWS_IAM,
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
      authMode: authModes.AWS_IAM,
    });

    return order.data.updateOrder;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const _updateUser = async ({ firstName, id, lastName, middleName, tableId, userState }) => {
  let params = {};
  if (firstName) {
    params = { ...params, firstName };
  }
  if (lastName) {
    params = { ...params, lastName };
  }

  if (middleName) {
    params = { ...params, middleName };
  }

  if (tableId) {
    params = { ...params, tableId };
  }

  if (userState) {
    params = { ...params, userState };
  }

  try {
    const data = await API.graphql({
      query: updateUser,
      variables: { input: { id, ...params } },
      authMode: authModes.AWS_IAM,
    });

    console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};
