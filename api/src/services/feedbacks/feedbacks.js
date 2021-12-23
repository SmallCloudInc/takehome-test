import { db } from 'src/lib/db'

export const feedbacks = async () => {
  return db.feedback.findMany({
    orderBy: [{ createdAt: 'desc' }],
  })
}
