/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      email
      deals {
        items {
          id
          name
          status
          file_size
          cost_to_date
          provider_id
          manifest_file
          createdAt
          updatedAt
          userDealsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      email
      deals {
        items {
          id
          name
          status
          file_size
          cost_to_date
          provider_id
          manifest_file
          createdAt
          updatedAt
          userDealsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      email
      deals {
        items {
          id
          name
          status
          file_size
          cost_to_date
          provider_id
          manifest_file
          createdAt
          updatedAt
          userDealsId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createDeal = /* GraphQL */ `
  mutation CreateDeal(
    $input: CreateDealInput!
    $condition: ModelDealConditionInput
  ) {
    createDeal(input: $input, condition: $condition) {
      id
      name
      status
      file_size

      cost_to_date
      provider_id
      manifest_file
      createdAt
      updatedAt
      userDealsId
    }
  }
`;
export const updateDeal = /* GraphQL */ `
  mutation UpdateDeal(
    $input: UpdateDealInput!
    $condition: ModelDealConditionInput
  ) {
    updateDeal(input: $input, condition: $condition) {
      id
      name
      status
      file_size
      cost_to_date
      provider_id
      manifest_file
      createdAt
      updatedAt
      userDealsId
    }
  }
`;
export const deleteDeal = /* GraphQL */ `
  mutation DeleteDeal(
    $input: DeleteDealInput!
    $condition: ModelDealConditionInput
  ) {
    deleteDeal(input: $input, condition: $condition) {
      id
      name
      status
      file_size
      cost_to_date
      provider_id
      manifest_file
      createdAt
      updatedAt
      userDealsId
    }
  }
`;
