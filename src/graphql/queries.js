/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      deals {
        items {
          id
          name
          status
          file_size
          upload_date
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        deals {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDeal = /* GraphQL */ `
  query GetDeal($id: ID!) {
    getDeal(id: $id) {
      id
      name
      status
      file_size
      upload_date
      cost_to_date
      provider_id
      manifest_file
      createdAt
      updatedAt
      userDealsId
    }
  }
`;
export const listDeals = /* GraphQL */ `
  query ListDeals(
    $filter: ModelDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        status
        file_size
        upload_date
        cost_to_date
        provider_id
        manifest_file
        createdAt
        updatedAt
        userDealsId
      }
      nextToken
    }
  }
`;
