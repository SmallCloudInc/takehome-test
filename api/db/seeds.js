/* eslint-disable no-console */
const { PrismaClient } = require('@prisma/client')
const dotenv = require('dotenv')
const admin = require('firebase-admin')

dotenv.config()

const db = new PrismaClient()

const CLOUDOPS_DATA = {
  insights: [
    {
      insightText: 'It would be very useful to have slack notifications when new data is added.',
    },
    {
      insightText: 'It is a hassle to switch between so many platforms, can you add a chrome extension?',
    },
    {
      insightText: 'Please add a page to check our previous orders so it is easier to reorder!',
    },
    {
      insightText: 'The website can be hard to navigate, it would be easier if there was a product category menu at the top of the pages.',
    },
  ],
}

const seedTeamRelatedItems = async ({ data }) => {
  await db.feedback.deleteMany({})

  data.insights.map(async (insight) => {
    await db.feedback.create({
      data: {
        text: insight.insightText,
      },
    })
  })
}

async function main() {
  // Seed data is database data that needs to exist for your app to run.
  // Ideally this file should be idempotent: running it multiple times
  // will result in the same database state (usually by checking for the
  // existence of a record before trying to create it). For example:

  await seedTeamRelatedItems({
    data: CLOUDOPS_DATA,
  })

  console.info('Done.')
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await db.$disconnect()
  })
