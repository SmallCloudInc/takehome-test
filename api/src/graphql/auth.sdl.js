export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    contactTeamId: String
    imageUrl: String
  }
`
