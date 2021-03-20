import { Link, routes, navigate } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

const LogoutPage = () => {
  const { logOut } = useAuth()
  useEffect(() => {
    logOut()
    navigate(routes.home())
  }, [])
  return (
    <>
      <p>Logging out...</p>
    </>
  )
}

export default LogoutPage
