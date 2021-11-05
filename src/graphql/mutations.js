/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent($input: createEventInput) {
    createEvent(input: $input) {
      code
      created
      dateOfEvent
      entityType
      id
      location
      modified
      name
    }
  }
`;
export const createOrder = /* GraphQL */ `
  mutation CreateOrder($input: createOrderInput!) {
    createOrder(input: $input) {
      order {
        created
        entityType
        fulfilledAt
        id
        modified
        status
      }
      products {
        product {
          category
          created
          entityType
          id
          modified
          name
          quantity
          isEnabled
        }
        quantity
      }
      table {
        created
        entityType
        id
        message
        modified
        name
        priority
        status
        isEnabled
      }
      user {
        created
        entityType
        firstName
        id
        lastName
        middleName
        modified
        userState
      }
    }
  }
`;
export const createProduct = /* GraphQL */ `
  mutation CreateProduct($input: createProductInput!) {
    createProduct(input: $input) {
      category
      created
      entityType
      id
      modified
      name
      quantity
      isEnabled
    }
  }
`;
export const createTable = /* GraphQL */ `
  mutation CreateTable($input: createTableInput!) {
    createTable(input: $input) {
      created
      entityType
      id
      message
      modified
      name
      priority
      status
      isEnabled
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser($input: createUserInput!) {
    createUser(input: $input) {
      created
      entityType
      firstName
      id
      lastName
      middleName
      modified
      userState
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent($id: ID!) {
    deleteEvent(id: $id) {
      id
      success
    }
  }
`;
export const notifyOrderUpdate = /* GraphQL */ `
  mutation NotifyOrderUpdate($orderId: ID!) {
    notifyOrderUpdate(orderId: $orderId) {
      order {
        order {
          created
          entityType
          fulfilledAt
          id
          modified
          status
        }
        products {
          product {
            category
            created
            entityType
            id
            modified
            name
            quantity
            isEnabled
          }
          quantity
        }
        table {
          created
          entityType
          id
          message
          modified
          name
          priority
          status
          isEnabled
        }
        user {
          created
          entityType
          firstName
          id
          lastName
          middleName
          modified
          userState
        }
      }
      orderId
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent($input: updateEventInput) {
    updateEvent(input: $input) {
      code
      created
      dateOfEvent
      entityType
      id
      location
      modified
      name
    }
  }
`;
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder($input: updateOrderInput) {
    updateOrder(input: $input) {
      order {
        created
        entityType
        fulfilledAt
        id
        modified
        status
      }
      products {
        product {
          category
          created
          entityType
          id
          modified
          name
          quantity
          isEnabled
        }
        quantity
      }
      table {
        created
        entityType
        id
        message
        modified
        name
        priority
        status
        isEnabled
      }
      user {
        created
        entityType
        firstName
        id
        lastName
        middleName
        modified
        userState
      }
    }
  }
`;
export const updateProduct = /* GraphQL */ `
  mutation UpdateProduct($input: updateProductInput!) {
    updateProduct(input: $input) {
      category
      created
      entityType
      id
      modified
      name
      quantity
      isEnabled
    }
  }
`;
export const updateTable = /* GraphQL */ `
  mutation UpdateTable($input: updateTableInput!) {
    updateTable(input: $input) {
      created
      entityType
      id
      message
      modified
      name
      priority
      status
      isEnabled
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: updateUserInput!) {
    updateUser(input: $input) {
      created
      entityType
      firstName
      id
      lastName
      middleName
      modified
      userState
    }
  }
`;
export const createPhoto = /* GraphQL */ `
  mutation CreatePhoto($input: createPhotoInput!) {
    createPhoto(input: $input) {
      created
      entityType
      id
      link
      isEnabled
      modified
    }
  }
`;
export const updatePhoto = /* GraphQL */ `
  mutation UpdatePhoto($input: updatePhotoInput!) {
    updatePhoto(input: $input) {
      created
      entityType
      id
      link
      isEnabled
      modified
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
export const deleteTable = /* GraphQL */ `
  mutation DeleteTable($id: ID!, $eventId: ID!) {
    deleteTable(id: $id, eventId: $eventId)
  }
`;
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule($eventId: ID!, $contents: [AWSJSON]) {
    createSchedule(eventId: $eventId, contents: $contents) {
      contents
      created
      entityType
      modified
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule($eventId: ID!, $contents: [AWSJSON]) {
    updateSchedule(eventId: $eventId, contents: $contents) {
      contents
      created
      entityType
      modified
    }
  }
`;
export const deleteFromSchedule = /* GraphQL */ `
  mutation DeleteFromSchedule($eventId: ID!, $contents: [AWSJSON]) {
    deleteFromSchedule(eventId: $eventId, contents: $contents) {
      contents
      created
      entityType
      modified
    }
  }
`;
