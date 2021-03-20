import { useEffect, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { useParams, Link, routes, navigate } from '@redwoodjs/router'

const CustomTokenPage = () => {
  const { client } = useAuth()
  const { token } = useParams()
  const [loading, setLoading] = useState(false)
  const [confirmationError, setConfirmationError] = useState(null)

  useEffect(() => {
    setLoading(true)
    if (token) {
      client
        .login({ usingProvider: 'token', token: token })
        .then((user) => {
          console.log(user)
          navigate(routes.portalHomePage())
          window.location.reload()
        })
        .catch((error) => {
          navigate(routes.portalHomePage())
        })
    } else {
      navigate(routes.home())
    }
  }, [client, token])

  return (
    <>
      <h1>Logging you in...</h1>
    </>
  )
}

export default CustomTokenPage
