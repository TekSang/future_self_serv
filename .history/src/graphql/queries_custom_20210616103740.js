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
