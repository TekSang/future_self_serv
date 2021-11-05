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
export const onTableUpdate = /* GraphQL */ `
  subscription OnTableUpdate($id: ID!) {
    onTableUpdate(id: $id) {
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
