import { Link, routes } from '@redwoodjs/router'
import { useSubdomain } from 'src/middleware'
import Layout from 'src/layouts/PortalLayout'
import { withPage } from 'src/components/WithPageHoc'
import { useAuth } from '@redwoodjs/auth'
import { formatDistanceToNow, format, parseJSON } from 'date-fns'
import PortalLoginSignupModal from 'src/components/PortalLoginSignUpModal'
import { Reoverlay } from 'reoverlay'
import PortalHeader from 'src/components/PortalHeader'
import PortalFeedbackModal from 'src/components/PortalFeedbackModal'
import { AvatarPill } from 'src/components/Avatar'

export const QUERY = gql`
  query HeaderContextQuery($subdomain: String!) {
    subdomainMetadata(subdomain: $subdomain) {
      id
      name
    }
    portalRoadmapCards(subdomain: $subdomain) {
      planned {
        slug
        name
        user {
          id
          name
          imageUrl
        }
        createdAt
      }
      inProgress {
        slug
        name
        user {
          id
          name
          imageUrl
        }
        createdAt
      }
      completed {
        slug
        name
        user {
          id
          name
          imageUrl
        }
        createdAt
      }
    }
  }
`

export const beforeQuery = (props) => {
  const subdomainSlug = useSubdomain()
  return { variables: { subdomain: subdomainSlug } }
}

const RoadmapItemCard = ({ card, mode }) => {
  return (
    <li>
      <Link class="block p-5 bg-white rounded-md shadow">
        <p class="leading-snug text-gray-900">{card.name}</p>
        <div class="mt-2 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            Tracked by <AvatarPill user={card.user} />
          </div>
          <div class="text-sm text-gray-600">{formatDistanceToNow(parseJSON(card.createdAt), 'LLLL, do yyyy')} ago</div>
        </div>
      </Link>
    </li>
  )
}

const Success = ({ portalRoadmapCards, subdomainMetadata }) => {
  const { currentUser, isAuthenticated } = useAuth()

  const onIssueBtn = () => {
    if (isAuthenticated) {
      Reoverlay.showModal(PortalFeedbackModal, {
        apiKey: currentUser.currentTeam.id,
        type: 'issue',
      })
    } else {
      Reoverlay.showModal(PortalLoginSignupModal)
    }
  }

  const onIdeaBtn = () => {
    if (isAuthenticated) {
      Reoverlay.showModal(PortalFeedbackModal, {
        apiKey: currentUser.currentTeam.id,
        type: 'idea',
      })
    } else {
      Reoverlay.showModal(PortalLoginSignupModal)
    }
  }

  return (
    <>
      <PortalHeader subdomainMetadata={subdomainMetadata} />
      <div class={'max-w-5xl mx-auto px-2 sm:px-4 lg:px-8 mt-4'}>
        <div class="">
          <div class="mt-3 text-lg">
            <main class="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div class="flex-shrink-0 flex flex-col rounded-md">
                <h3 class="flex-shrink-0 pt-3 pb-1 font-medium text-gray-700">Planned</h3>
                <div class="min-h-0 overflow-y-auto bg-gray-50 ">
                  {portalRoadmapCards.planned.length > 0 && (
                    <ul class="pt-3 pb-3 px-3 space-y-3">
                      {portalRoadmapCards.planned.map((card) => (
                        <RoadmapItemCard card={card} />
                      ))}
                    </ul>
                  )}
                  {portalRoadmapCards.planned.length == 0 && <div className="p-3 text-sm leading-none ">There is no items in the planned state</div>}
                </div>
              </div>
              <div class="flex-shrink-0 flex flex-col rounded-md">
                <h3 class="flex-shrink-0 pt-3 pb-1 font-medium text-gray-700">In Progress</h3>
                <div class="min-h-0 overflow-y-auto bg-gray-50 ">
                  {portalRoadmapCards.inProgress.length > 0 && (
                    <ul class="pt-3 pb-3 px-3 space-y-3">
                      {portalRoadmapCards.inProgress.map((card) => (
                        <RoadmapItemCard card={card} />
                      ))}
                    </ul>
                  )}
                  {portalRoadmapCards.inProgress.length == 0 && <div className="p-3 text-sm leading-none ">There is no items in the in progress state</div>}
                </div>
              </div>
              <div class="flex-shrink-0 flex flex-col rounded-md">
                <h3 class="flex-shrink-0 pt-3 pb-1 font-medium text-gray-700">Completed</h3>
                <div class="min-h-0 overflow-y-auto bg-gray-50 ">
                  {portalRoadmapCards.completed.length > 0 && (
                    <ul class="pt-3 pb-3 px-3 space-y-3">
                      {portalRoadmapCards.completed.map((card) => (
                        <RoadmapItemCard card={card} />
                      ))}
                    </ul>
                  )}
                  {portalRoadmapCards.completed.length == 0 && <div className="p-3 text-sm leading-none ">There is no items in the considering state</div>}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

const Empty = () => (
  <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-no-wrap">
    <div class="ml-4 mt-4">
      <h3 class="text-xl leading-6 font-medium text-gray-900">Company not found</h3>
      <p class="mt-3 text-base leading-5 text-gray-500">There is no feedback portal found at this URL. Did you enter the right URL?</p>
    </div>
  </div>
)

export default withPage({
  beforeQuery,
  QUERY,
  Success,
  Empty,
  Layout,
})
