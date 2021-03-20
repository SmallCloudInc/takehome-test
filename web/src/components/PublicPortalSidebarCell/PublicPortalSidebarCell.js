import { useAuth } from '@redwoodjs/auth'

const portalHost = process.env.UV_PORTAL_DOMAIN

export const QUERY = gql`
  query PublicPortalSidebarQuery {
    myPortalToken {
      token
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div></div>

export const Success = ({ myPortalToken }) => {
  const { currentUser } = useAuth()

  return (
    <div className="mt-auto space-y-1">
      <h3 className="px-3 text-sm font-medium tracking-wider text-gray-500 uppercase" id="projects-headline">
        {currentUser.currentTeam.name} portal
      </h3>
      <div className="space-y-1" role="group" aria-labelledby="projects-headline">
        <a href={`http://${currentUser.defaultWorkspace}.${portalHost}/?token=${myPortalToken.token}`} target="_blank" className="flex items-center px-3 py-1 text-gray-600 rounded-md group hover:text-gray-900 hover:bg-gray-50">
          <span className="truncate">Public portal</span>
        </a>
      </div>
    </div>
  )
}
