import { API, graphqlOperation } from "aws-amplify";
import { createOrder } from "../graphql/mutations";
import { authModes } from "../libs/constants";

export const _createBooking = async (input) => {
  const { numberOfPassengers, numberOfChildren, bookingStatus, tripId, userId, total } = input;
  try {
    const booking = await API.graphql({
      query: createBooking,
      variables: { input: { numberOfPassengers, numberOfChildren, bookingStatus, tripId, userId, total } },
    });
    return booking.data.createBooking;
  } catch (error) {
    return { error: error.message };
  }
};
