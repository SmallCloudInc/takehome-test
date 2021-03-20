export const schema = gql`
  type Feedback {
    id: String!
    text: String!
    createdAt: DateTime!
    type: FeedbackType!
    Team: Team
    teamId: String
    originalUrl: String
    sourceType: InsightSource
    metadata: JSON
    submitter: User
    contact: User
    roadmapItem: RoadmapItem
  }
  type Query {
    feedbacks: [Feedback!]!
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
