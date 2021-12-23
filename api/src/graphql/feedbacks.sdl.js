export const schema = gql`
  type Feedback {
    id: String!
    text: String!
    createdAt: DateTime!
    type: FeedbackType!
    teamId: String
    originalUrl: String
    sourceType: InsightSource
    metadata: JSON
    submitter: User
    contact: User
  }

  type Query {
    feedbacks: [Feedback!]! @skipAuth
  }

  enum FeedbackType {
    IDEA
    ISSUE
    OTHER
  }

  enum InsightSource {
    SLACK
    CHROME
    API
    PORTAL
    ADMIN
    INTERCOM
  }
`
