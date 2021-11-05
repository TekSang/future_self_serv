import { useEffect, useContext } from "react";
import { Context } from "../context/contextActions";
import { _createOrder, _updateOrder } from "../graphql_operations/mutations";
import { ORDER_ACTIONS, ORDER_STATUS } from "../libs/constants";
// Hook

export default function useOrderEventListener() {
  const {
    state: { order, localOrders, event, table, user, orderAction },
    setOrder,
    setOrderAction,
  } = useContext(Context);

  useEffect(() => {
    switch (orderAction) {
      case ORDER_ACTIONS.CREATE_ORDER:
        createOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ quantity, productId: id })),
          tableId: table.id,
          userId: user.id,
        });
        break;
      case ORDER_ACTIONS.UPDATE_ORDER_QUANTITIES:
        updateOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ quantity, productId: id })),
          tableId: table.id,
          userId: user.id,
          id: order.id,
          status: ORDER_STATUS.INLINE,
        });
        break;
      case ORDER_ACTIONS.UPDATE_ORDER_TO_CHOOSING:
        updateOrder({
          eventId: event.id,
          tableId: table.id,
          userId: user.id,
          id: order.id,
          status: ORDER_STATUS.CHOOSING,
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
    if (orderAction) {
      setOrderAction("");
    }
  }, [orderAction]); // eslint-disable-line react-hooks/exhaustive-deps

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
