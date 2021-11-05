import { API } from "aws-amplify";
import { getAllProducts, getEventByCode, getOrdersByStatus } from "../graphql/queries";
import { getAllUsersAtEvent, getAllTableIds } from "../graphql/queries_custom";

import { authModes } from "../libs/constants";

export const _getAllProducts = async ({ eventId }) => {
  try {
    const res = await API.graphql({
      query: getAllProducts,
      variables: {
        eventId,
      },
      authMode: authModes.AWS_IAM,
    });

    return res.data.getAllProducts;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllTableIds = async ({ eventId, nextToken }) => {
  try {
    const res = await API.graphql({
      query: getAllTableIds,
      variables: {
        eventId,
        nextToken,
      },
      authMode: authModes.AWS_IAM,
    });

    console.log(res.data.getAllTables.tables.map((t) => t.table.id));

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const _getEventByCode = async ({ code }) => {
  try {
    const res = await API.graphql({
      query: getEventByCode,
      variables: {
        code,
      },
      authMode: authModes.AWS_IAM,
    });

    return res.data.getEventByCode;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllUsersAtEvent = async ({ eventId }) => {
  try {
    const res = await API.graphql({
      query: getAllUsersAtEvent,
      variables: {
        eventId,
      },
      authMode: authModes.AWS_IAM,
    });

    return res.data.getAllUsersAtEvent;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllOrdersByStatus = async ({ eventId, status, nextToken }) => {
  console.log(status);
  try {
    const res = await API.graphql({
      query: getOrdersByStatus,
      variables: {
        eventId,
        status,
        nextToken,
      },
      authMode: authModes.AWS_IAM,
    });

    return res.data.getOrdersByStatus;
  } catch (error) {
    console.log(error);
  }
};
