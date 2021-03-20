export const schema = gql`
  type Roadmap {
    id: String!
    name: String!
    slug: String!
    items: [RoadmapItem]
  }

  type RoadmapItemCategory {
    id: String!
    name: String!
  }

  enum RoadmapStatusTypes {
    Open
    UnderReview
    Planned
    InProgress
    Complete
    Closed
  }

  type RoadmapItem {
    id: String!
    name: String!
    slug: String!
    desc: String
    user: User
    roadmap: Roadmap!
    status: RoadmapStatusTypes!
    feedback: [Feedback]
    category: RoadmapItemCategory
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type RoadmapCards {
    completed: [RoadmapItem!]!
    planned: [RoadmapItem!]!
    inProgress: [RoadmapItem!]!
  }

  type Query {
    portalRoadmapCards(subdomain: String!): RoadmapCards!
  }
`
