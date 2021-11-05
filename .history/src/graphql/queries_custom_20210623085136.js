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
        }
        user {
          entityType
          firstName
          id
          lastName
          middleName
        }
      }
    }
  }
`;

export const getAllTables = /* GraphQL */ `
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
