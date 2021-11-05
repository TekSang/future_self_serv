import { API } from "aws-amplify";
import {
  getAllProducts,
  getEventByCode,
  getOrder,
  getOrdersByStatus,
  getOrdersOnTable,
  getUser,
} from "../graphql/queries";
import { getAllUsersAtEvent, getAllTableIds } from "../graphql/queries_custom";

import { authModes } from "../libs/constants";

export const _getUser = async ({ id }) => {
  try {
    let {
      data: { getUser: gottenUser },
    } = await API.graphql({
      query: getUser,
      variables: {
        id,
      },
      authMode: authModes.AWS_IAM,
    });

    return gottenUser;
  } catch (error) {
    console.log("🚀 ~ file: queries.js ~ line 18 ~ const_getUser= ~ error", error);
  }
};

export const _getOrder = async ({ id }) => {
  try {
    let {
      data: { getOrder: gottenOrder },
    } = await API.graphql({
      query: getOrder,
      variables: {
        id,
      },
      authMode: authModes.AWS_IAM,
    });

    return gottenOrder;
  } catch (error) {}
};

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

    return {
      tableIds: res.data.getAllTables.tables.map((t) => t.table.id),
      nextToken: res.data.getAllTables.nextToken,
    };
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

export const _getAllOrdersByStatus = async ({ eventId, statuses, nextToken }) => {
  try {
    const res = await API.graphql({
      query: getOrdersByStatus,
      variables: {
        eventId,
        statuses,
        nextToken,
      },
      authMode: authModes.AWS_IAM,
    });

    return res.data.getOrdersByStatus;
  } catch (error) {
    console.log(error);
  }
};

export const _getOrdersOnTable = async ({ tableId, statuses, date }) => {
  try {
    const res = await API.graphql({
      query: getOrdersOnTable,
      variables: {
        input: { tableId, statuses, date },
      },
      authMode: authModes.AWS_IAM,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
