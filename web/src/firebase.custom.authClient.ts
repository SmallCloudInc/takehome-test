import type * as Firebase from 'firebase/app'

export type Firebase = typeof Firebase

import { AuthClient } from '@redwoodjs/auth'

// @TODO: Firebase doesn't export a list of providerIds they use
// But I found them here: https://github.com/firebase/firebase-js-sdk/blob/a5768b0aa7d7ce732279931aa436e988c9f36487/packages/rules-unit-testing/src/api/index.ts
export type oAuthProvider = 'email' | 'google.com' | 'microsoft.com'

export const firebase = (client: Firebase): AuthClient => {
  // Use a function to allow us to extend for non-oauth providers in the future
  const getProvider = (providerId: oAuthProvider) => {
    return new client.auth.OAuthProvider(providerId)
  }

  return {
    type: 'custom',
    client,
    restoreAuthState: () => client.auth().getRedirectResult(),
    login: async ({ usingProvider = 'email', email, password, token }) => {
      if (usingProvider == 'email') {
        return client.auth().signInWithEmailAndPassword(email, password)
      }
      if (usingProvider == 'token') {
        return client.auth().signInWithCustomToken(token)
      }
      const provider = getProvider(usingProvider)
      return client.auth().signInWithPopup(provider)
    },
    logout: () => client.auth().signOut(),
    signup: async (usingProvider: oAuthProvider = 'google.com') => {
      const provider = getProvider(usingProvider)
      return client.auth().signInWithPopup(provider)
    },
    getToken: async () => client.auth().currentUser?.getIdToken(true) ?? null,
    getUserMetadata: async () => client.auth().currentUser,
  }
}
