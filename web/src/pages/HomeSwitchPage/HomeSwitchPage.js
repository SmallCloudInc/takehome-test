import { Link, navigate, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useEffect } from 'react'

const HomeSwitchPage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard({ workspace: currentUser.defaultWorkspace }))
    } else {
      navigate(routes.login())
    }
  }, [isAuthenticated, currentUser])
  return (
    <>
      <p>Loading your workspace...</p>
    </>
  )
}

export default HomeSwitchPage
