import { db } from 'src/lib/db'

export const portalRoadmapCards = async ({ subdomain }) => {
  return {
    completed: await db.roadmapItem.findMany({
      where: {
        team: { subdomain: subdomain },
        status: 'Complete',
      },
      include: {
        user: true,
      },
    }),
    planned: await db.roadmapItem.findMany({
      where: {
        team: { subdomain: subdomain },
        status: 'Planned',
      },
      include: {
        user: true,
      },
    }),
    inProgress: await db.roadmapItem.findMany({
      where: {
        team: { subdomain: subdomain },
        status: 'InProgress',
      },
      include: {
        user: true,
      },
    }),
  }
}
