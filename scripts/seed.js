import { db } from 'api/src/lib/db'

const CLOUDOPS_DATA = {
  insights: [
    {
      insightText:
        'It would be very useful to have slack notifications when new data is added.',
    },
    {
      insightText:
        'It is a hassle to switch between so many platforms, can you add a chrome extension?',
    },
    {
      insightText:
        'Please add a page to check our previous orders so it is easier to reorder!',
    },
    {
      insightText:
        'The website can be hard to navigate, it would be easier if there was a product category menu at the top of the pages.',
    },
  ],
}

export default async () => {
  try {
    await db.feedback.deleteMany({})
    // Note: if using PostgreSQL, using `createMany` to insert multiple records is much faster
    // @see: https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#createmany
    Promise.all(
      //
      // Change to match your data model and seeding needs
      //
      CLOUDOPS_DATA.insights.map(async (insight) => {
        await db.feedback.create({
          data: {
            text: insight.insightText,
          },
        })
      })
    )
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
