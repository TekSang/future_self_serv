import { API } from "aws-amplify";
import {
  getAllProducts,
  getEventByCode,
  getOrder,
  getOrdersByStatus,
  getOrdersByUser,
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
      data: { getOrder: order },
    } = await API.graphql({
      query: getOrder,
      variables: {
        id,
      },
      authMode: authModes.AWS_IAM,
    });

    return order;
  } catch (error) {}
};

export const _getAllProducts = async ({ eventId }) => {
  try {
    const {
      data: { getAllProducts: products },
    } = await API.graphql({
      query: getAllProducts,
      variables: {
        eventId,
      },
      authMode: authModes.AWS_IAM,
    });

    return products;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllTableIds = async ({ eventId, nextToken }) => {
  try {
    const {
      data: {
        getAllTables: { tables, nextToken: nt },
      },
    } = await API.graphql({
      query: getAllTableIds,
      variables: {
        eventId,
        nextToken,
      },
      authMode: authModes.AWS_IAM,
    });

    return {
      tableIds: tables.map((t) => t.table.id),
      nextToken: nt,
    };
  } catch (error) {
    console.log(error);
  }
};

export const _getEventByCode = async ({ code }) => {
  try {
    const {
      data: { getEventByCode: event },
    } = await API.graphql({
      query: getEventByCode,
      variables: {
        code,
      },
      authMode: authModes.AWS_IAM,
    });

    return event;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllUsersAtEvent = async ({ eventId }) => {
  try {
    const {
      data: { getAllUsersAtEvent: users },
    } = await API.graphql({
      query: getAllUsersAtEvent,
      variables: {
        eventId,
      },
      authMode: authModes.AWS_IAM,
    });

    return users;
  } catch (error) {
    console.log(error);
  }
};

export const _getOrdersByUser = async ({ eventId, id, statuses }) => {
  try {
    const {
      data: { getOrdersByUser: orders },
    } = await API.graphql({
      query: getOrdersByUser,
      variables: {
        eventId,
        id,
        statuses,
      },
      authMode: authModes.AWS_IAM,
    });

    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const _getAllOrdersByStatus = async ({ eventId, statuses, nextToken }) => {
  try {
    const {
      data: { getOrdersByStatus: orders },
    } = await API.graphql({
      query: getOrdersByStatus,
      variables: {
        eventId,
        statuses,
        nextToken,
      },
      authMode: authModes.AWS_IAM,
    });

    return orders;
  } catch (error) {
    console.log(error);
  }
};

export const _getOrdersOnTable = async ({ tableId, statuses, date }) => {
  try {
    const {
      data: { getOrdersOnTable: orders },
    } = await API.graphql({
      query: getOrdersOnTable,
      variables: {
        input: { tableId, statuses, date },
      },
      authMode: authModes.AWS_IAM,
    });
    console.log(orders);
    return orders;
  } catch (error) {
    console.log(error);
  }
};
