import { Link, routes, NavLink, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { getInitials } from 'src/utils'
import PortalLoginSignupModal from 'src/components/PortalLoginSignUpModal'
import { Reoverlay } from 'reoverlay'
import { AvatarPill } from 'src/components/Avatar'

const PortalHeader = ({ subdomainMetadata }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  const onClickAuthLink = () => {
    Reoverlay.showModal(PortalLoginSignupModal)
  }
  const onLogout = () => {
    logOut()
    navigate(routes.portalHomePage())
  }

  if (isAuthenticated) {
    return (
      <header class="bg-white shadow">
        <div class="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
          <div class="relative h-16 flex justify-between ">
            <div class="relative z-10 px-2 flex lg:px-0">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-2xl font-bold text-gray-800">{subdomainMetadata.name}</h1>
              </div>
            </div>
            <div class="relative z-10 ml-4 flex items-center">
              <div class="flex-shrink-0 relative ml-4">
                <div>
                  <div class="flex items-center">
                    <div>
                      <AvatarPill user={currentUser} size="h-9 w-9" forceDefault={true} forceDefault={true} />
                    </div>
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">{currentUser.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            <NavLink
              to={routes.portalHomePage()}
              className="inline-flex items-center px-1 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent group hover:text-gray-700 hover:border-gray-300"
              activeClassName="text-purple-600 border-purple-500 hover:border-purple-500 hover:text-purple-600"
            >
              <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Roadmap</span>
            </NavLink>

            <div class="flex-1 flex justify-center lg:justify-end">
              <a
                onClick={onLogout}
                className="inline-flex items-center px-1 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent cursor-pointer group hover:text-gray-700 hover:border-gray-300"
                activeClassName="text-purple-600 border-purple-500 hover:border-purple-500 hover:text-purple-600"
              >
                <span>Logout</span>
              </a>
            </div>
          </nav>
        </div>
      </header>
    )
  } else {
    return (
      <header class="bg-white shadow">
        <div class="max-w-5xl mx-auto px-2 sm:px-4 lg:px-8">
          <div class="relative h-16 flex justify-between ">
            <div class="relative z-10 px-2 flex lg:px-0">
              <div class="flex-shrink-0 flex items-center">
                <h1 class="text-2xl font-bold text-gray-800">{subdomainMetadata.name}</h1>
              </div>
            </div>
            <div class="relative z-10 ml-4 flex items-center">
              <div class="flex-shrink-0 relative ml-4">
                <div>
                  <a onClick={onClickAuthLink} class="flex-shrink-0 group block">
                    <div class="flex items-center">
                      <p>Log in or Sign Up</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <nav class="flex space-x-4" aria-label="Tabs">
            <NavLink
              to={routes.portalHomePage()}
              className="inline-flex items-center px-1 py-2 text-sm font-medium text-gray-500 border-b-2 border-transparent group hover:text-gray-700 hover:border-gray-300"
              activeClassName="text-purple-600 border-purple-500 hover:border-purple-500 hover:text-purple-600"
            >
              <svg class="-ml-0.5 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </NavLink>

            <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <span>Roadmap</span>
          </nav>
        </div>
      </header>
    )
  }
}

export default PortalHeader
