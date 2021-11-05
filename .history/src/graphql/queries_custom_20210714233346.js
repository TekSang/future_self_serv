export const getAllUsersAtEvent = /* GraphQL */ `
  query GetAllUsersAtEvent($eventId: ID!, $nextToken: String) {
    getAllUsersAtEvent(eventId: $eventId, nextToken: $nextToken) {
      nextToken
      users {
        table {
          entityType
          id
          message
          name
          priority
          status
          isEnabled
        }
        user {
          entityType
          firstName
          id
          lastName
          middleName
          isEnabled
        }
      }
    }
  }
`;

export const getAllTableIds = /* GraphQL */ `
  query GetAllTables($nextToken: String, $eventId: ID!) {
    getAllTables(nextToken: $nextToken, eventId: $eventId) {
      tables {
        table {
          id
        }
      }
      nextToken
    }
  }
`;

export const getOrdersByStatusCustom = /* GraphQL */ `
  query GetOrdersByStatus($eventId: ID!, $nextToken: String, $statuses: [OrderStatus!]!) {
    getOrdersByStatus(eventId: $eventId, nextToken: $nextToken, statuses: $statuses) {
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
        }
        user {
          created
          entityType
          firstName
          id
          lastName
          middleName
          modified
        }
      }
    }
  }
`;
