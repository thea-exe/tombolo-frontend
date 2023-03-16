/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateDeal = /* GraphQL */ `
  subscription OnCreateDeal($filter: ModelSubscriptionDealFilterInput) {
    onCreateDeal(filter: $filter) {
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
export const onUpdateDeal = /* GraphQL */ `
  subscription OnUpdateDeal($filter: ModelSubscriptionDealFilterInput) {
    onUpdateDeal(filter: $filter) {
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
export const onDeleteDeal = /* GraphQL */ `
  subscription OnDeleteDeal($filter: ModelSubscriptionDealFilterInput) {
    onDeleteDeal(filter: $filter) {
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
