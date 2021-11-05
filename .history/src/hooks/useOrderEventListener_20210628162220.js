import { useEffect, useContext } from "react";
import { Context } from "../context/contextActions";
import { _createOrder, _updateOrder } from "../graphql_operations/mutations";
import { defaultState, ORDER_ACTIONS, ORDER_STATUS } from "../libs/constants";
// Hook

export default function useOrderEventListener() {
  const {
    state: { order, localOrders, event, table, user, currentPage, orderAction, updateLocalOrder },
    setOrder,
    setLocalOrders,
    setOrderAction,
    toggleUpdateLocalOrder,
  } = useContext(Context);

  useEffect(() => {
    switch (orderAction) {
      case ORDER_ACTIONS.CREATE_ORDER:
        console.log({
          eventId: event.id,
          products: localOrders.map((lo) => ({ ...lo, productId: lo.id })),
          tableId: table.id,
          userId: user.id,
        });
        createOrder({
          eventId: event.id,
          products: localOrders.map((lo) => ({ ...lo, productId: lo.id })),
          tableId: table.id,
          userId: user.id,
        });
        break;
      case ORDER_ACTIONS.UPDATE_ORDER_QUANTITIES:
        updateOrder({
          eventId: event.id,
          products: localOrders.map((lo) => ({ ...lo, productId: lo.id })),
          tableId: table.id,
          userId: user.id,
          id: order.id,
          status: ORDER_STATUS.INLINE,
        });
        break;
      case ORDER_ACTIONS.CANCEL_ORDER:
        updateOrder({
          eventId: event.id,
          tableId: table.id,
          userId: user.id,
          id: order.id,
          status: ORDER_STATUS.CANCELLED,
        });
        break;

      default:
        break;
    }
    console.log(orderAction);
    if (orderAction) {
      setOrderAction("");
    }
  }, [orderAction]);

  async function createOrder({ eventId, products, tableId, userId }) {
    try {
      const dbOrder = await _createOrder({ eventId, products, tableId, userId });

      setOrder({
        ...dbOrder.order,
        products: dbOrder.products.map((p) => ({
          ...p.product,
          quantity: p.quantity,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateOrder({ eventId, products, tableId, fulfilledAt, id, status }) {
    try {
      const dbOrder = await _updateOrder({ eventId, products, tableId, fulfilledAt, id, status });
      setOrder({
        ...dbOrder.order,
        products: dbOrder.products.map((p) => ({
          ...p.product,
          quantity: p.quantity,
        })),
      });
    } catch (error) {
      console.log(error);
    }
  }
}
