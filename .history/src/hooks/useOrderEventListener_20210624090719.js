import { useEffect, useContext } from "react";
import { Context } from "../context/contextActions";
import { _createOrder, _updateOrder } from "../graphql_operations/mutations";
import { defaultState, ORDER_STATUS } from "../libs/constants";
// Hook

export default function useOrderEventListener() {
  const {
    state: { order, localOrders, event, table, user },
    setOrder,
    setLocalOrders,
  } = useContext(Context);

  useEffect(() => {
    switch (order.status) {
      case ORDER_STATUS.CANCELLED:
        setOrder(defaultState.order);
        setLocalOrders(defaultState.localOrders);
        break;
      case ORDER_STATUS.COMPLETED:
        setOrder(defaultState.order);
        setLocalOrders(defaultState.localOrders);
        break;
      case ORDER_STATUS.INLINE:
        if (order.id) {
          if (order.products.length > 0) {
            updateOrder({
              eventId: event.id,
              tableId: table.id,
              id: order.id,
              status: ORDER_STATUS.INLINE,
            });
          }
        }
        break;
      default:
        break;
    }
  }, [order.status]);

  useEffect(() => {
    if (localOrders.length > 0) {
      if (order.id) {
        updateOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ productId: id, quantity })),
          tableId: table.id,
          id: order.id,
          status: ORDER_STATUS.CHOOSING,
        });
      } else {
        createOrder({
          eventId: event.id,
          products: localOrders.map(({ id, quantity }) => ({ productId: id, quantity })),
          tableId: table.id,
          userId: user.id,
        });
      }
    } else {
      if (order.id) {
        if (order.products.length > 0) {
          updateOrder({
            eventId: event.id,
            products: order.products.map(({ id }) => ({ productId: id, quantity: 0 })),
            tableId: table.id,
            id: order.id,
            status: ORDER_STATUS.CANCELLED,
          });
        }
      }
      setOrder(defaultState.order);
    }
    console.log(localOrders.length, "ssssssss");
  }, [localOrders]); // eslint-disable-line react-hooks/exhaustive-deps

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
