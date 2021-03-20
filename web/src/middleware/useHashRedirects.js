import { useEffect, useState } from 'react'
import { routes, navigate, useParams } from '@redwoodjs/router'

const HASH_REDIRECTS = [
  {
    hash: 'confirmation_token',
    route: (token) => routes.confirmEmail({ token }),
  },
  {
    hash: 'recovery_token',
    route: (token) => routes.resetPassword({ token }),
  },
]

const PARAMS_DIRECTS = [
  {
    param: 'token',
    route: (token) => routes.customToken({ token }),
  },
]

export const useHashRedirects = () => {
  const hash = window.location.hash
  useEffect(() => {
    if (hash) {
      for (let redirect of HASH_REDIRECTS) {
        if (hash.includes(redirect.hash)) {
          let token = hash.slice(hash.indexOf('=') + 1)
          navigate(redirect.route(token))
        }
      }
    }
  }, [hash])

  const params = window.location.search
  useEffect(() => {
    if (params) {
      for (let redirect of PARAMS_DIRECTS) {
        if (params.includes(redirect.param)) {
          let token = params.slice(params.indexOf('=') + 1)
          navigate(redirect.route(token))
        }
      }
    }
  }, [params])
}

export function useSubdomain() {
  const [, , subdomain] = window.location.hostname.split('.').reverse()
  return subdomain
}
