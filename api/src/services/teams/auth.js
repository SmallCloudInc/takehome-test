import { db } from 'src/lib/db'
import { requireAuth, firebaseApp } from 'src/lib/auth'
import { ValidationError } from '@redwoodjs/api'

export const myPortalToken = async () => {
  requireAuth()
  const customToken = await firebaseApp.auth().createCustomToken(context.currentUser.sub)
  return {
    token: customToken,
  }
}

export const accountSignupAdmin = async ({ input, code, state }) => {
  let accessToken
  let intercomWorkspaceData

  try {
    await firebaseApp.auth().getUserByEmail(input.email)
    return new ValidationError(`The email is already registered.`)
  } catch (err) {
    if (err.code !== 'auth/user-not-found') {
      return new ValidationError(err.message)
    }
  }

  const checkEmailExists = await db.user.findMany({
    where: {
      email: input.email,
    },
  })
  if (checkEmailExists.length > 0) return new ValidationError(`The email is already registered.`)

  const checkTeamExists = await db.team.findMany({
    where: {
      subdomain: input.subdomain,
    },
  })
  if (checkTeamExists.length > 0) return new ValidationError(`The subdomain is already is in use.`)

  const user = await firebaseApp.auth().createUser({
    email: input.email,
    password: input.password,
    displayName: input.name,
  })

  const newUser = await db.user.create({
    data: {
      sub: user.uid,
      email: user.email,
      name: input.name,
      role: 'ADMIN',
    },
  })
  const newTeam = await db.team.create({
    data: {
      name: input.company,
      subdomain: input.subdomain,
      owner: {
        connect: {
          id: newUser.id,
        },
      },
    },
  })
  const defaultRoadmap = await db.roadmap.create({
    data: {
      name: 'roadmap',
      slug: 'roadmap',
      team: {
        connect: {
          id: newTeam.id,
        },
      },
    },
  })

  return { ...input }
}

export const subdomainMetadata = async ({ subdomain }) => {
  const teams = await db.team.findMany({
    where: {
      subdomain: subdomain,
    },
  })
  if (teams) {
    return teams[0]
  } else {
    return null
  }
}
