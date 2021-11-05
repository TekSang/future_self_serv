/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder {
    onUpdateOrder {
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
`;
export const onUpdateSpecificOrder = /* GraphQL */ `
  subscription OnUpdateSpecificOrder($orderId: ID!) {
    onUpdateSpecificOrder(orderId: $orderId) {
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
      orderId
    }
  }
`;
