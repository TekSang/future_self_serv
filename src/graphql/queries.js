/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAllProducts = /* GraphQL */ `
  query GetAllProducts($eventId: ID!) {
    getAllProducts(eventId: $eventId) {
      nextToken
      products {
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
  }
`;
export const getAllTables = /* GraphQL */ `
  query GetAllTables($eventId: ID!, $nextToken: String) {
    getAllTables(eventId: $eventId, nextToken: $nextToken) {
      nextToken
      tables {
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
        users {
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
  }
`;
export const getAllPhotos = /* GraphQL */ `
  query GetAllPhotos($eventId: ID!, $nextToken: String) {
    getAllPhotos(eventId: $eventId, nextToken: $nextToken) {
      nextToken
      photos {
        created
        entityType
        id
        link
        isEnabled
        modified
      }
    }
  }
`;
export const getAllUsersAtEvent = /* GraphQL */ `
  query GetAllUsersAtEvent($eventId: ID!, $nextToken: String) {
    getAllUsersAtEvent(eventId: $eventId, nextToken: $nextToken) {
      nextToken
      users {
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
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const getEventByCode = /* GraphQL */ `
  query GetEventByCode($code: String!) {
    getEventByCode(code: $code) {
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
export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
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
export const getOrdersByStatus = /* GraphQL */ `
  query GetOrdersByStatus(
    $eventId: ID!
    $nextToken: String
    $statuses: [OrderStatus!]!
  ) {
    getOrdersByStatus(
      eventId: $eventId
      nextToken: $nextToken
      statuses: $statuses
    ) {
      nextToken
      orders {
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
  }
`;
export const getOrdersByUser = /* GraphQL */ `
  query GetOrdersByUser($eventId: ID!, $id: ID!, $statuses: [OrderStatus!]) {
    getOrdersByUser(eventId: $eventId, id: $id, statuses: $statuses) {
      nextToken
      orders {
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
  }
`;
export const getProduct = /* GraphQL */ `
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
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
export const getProductCategories = /* GraphQL */ `
  query GetProductCategories($eventId: ID!) {
    getProductCategories(eventId: $eventId)
  }
`;
export const getTable = /* GraphQL */ `
  query GetTable($id: ID!) {
    getTable(id: $id) {
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
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const getUsersOnTable = /* GraphQL */ `
  query GetUsersOnTable($id: ID!) {
    getUsersOnTable(id: $id) {
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
      users {
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
export const getOrdersOnTable = /* GraphQL */ `
  query GetOrdersOnTable($input: getOrdersOnTableInput) {
    getOrdersOnTable(input: $input) {
      nextToken
      orders {
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
  }
`;
export const getSchedule = /* GraphQL */ `
  query GetSchedule($eventId: ID!) {
    getSchedule(eventId: $eventId) {
      contents
      created
      entityType
      modified
    }
  }
`;
