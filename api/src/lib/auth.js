import { AuthenticationError } from '@redwoodjs/api'
import admin from 'firebase-admin'

import { db } from './db'

var serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS)

const config = {
  credential: admin.credential.cert(serviceAccount),
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

export const firebaseApp = admin.initializeApp(config)

export const getCurrentUser = async (decoded, { token, type }) => {
  const { email, uid, ...userProps } = await firebaseApp.auth().verifyIdToken(token)
  const account = await db.user.findUnique({
    where: { sub: uid },
    include: {
      ownerOfTeam: true,
      contactOfTeam: true,
    },
  })
  if (!account) return null
  const roles = [account.role]

  const currentUser = {
    userId: account.id,
    sub: account.sub,
    email: account.email,
    imageUrl: account.imageUrl,
    name: account.name,
    currentTeam: account?.ownerOfTeam || account.contactOfTeam,
    defaultWorkspace: account?.ownerOfTeam?.subdomain || account.contactOfTeam.subdomain,
    roles: roles,
  }
  return { ...currentUser }
}

// Use this function in your services to check that a user is logged in, and
// optionally raise an error if they're not.

export const requireAuth = ({ role } = {}) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (typeof role !== 'undefined' && typeof role === 'string' && !context.currentUser.roles?.includes(role)) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (typeof role !== 'undefined' && Array.isArray(role) && !context.currentUser.roles?.some((r) => role.includes(r))) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
