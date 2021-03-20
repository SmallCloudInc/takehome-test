export const schema = gql`
  type Team {
    id: String!
    name: String!
    subdomain: String!
    feedbacks: [Feedback]!
    imageUrl: String
  }

  type User {
    id: String!
    email: String!
    name: String
    contactTeamId: String
    imageUrl: String
  }

  type Query {
    subdomainMetadata(subdomain: String!): Team
    myPortalToken: CustomToken
  }

  input AccountSignupInput {
    name: String!
    email: String!
    company: String!
    subdomain: String!
    password: String!
  }

  type AccountSignupOutput {
    name: String!
    email: String!
    company: String!
    subdomain: String!
    password: String!
    redirect: String
  }

  type CustomToken {
    token: String!
  }

  type Mutation {
    accountSignupAdmin(input: AccountSignupInput!, code: String, state: String): AccountSignupOutput
    customerToken(customerId: String!): CustomToken
  }

  input CreateTeamInput {
    name: String!
  }
`
