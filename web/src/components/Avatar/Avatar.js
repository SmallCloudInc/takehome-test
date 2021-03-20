import { clamp, range, startCase, take } from 'lodash'
import { getInitials } from 'src/utils'

const colors = [
  ['bg-purple-400', 'text-white'],
  ['bg-blue-300', 'text-gray-100'],
  ['bg-red-400', 'text-white'],
]

export const CompactAvatar = ({ user, size = 'h-7 w-7', forceDefault }) => {
  const initials = getInitials(user?.name || 'UV')

  function numberFromText(text) {
    const charCodes = text
      .split('')
      .map((char) => char.charCodeAt(0))
      .join('')
    return parseInt(charCodes, 10)
  }

  const bgColor = colors[numberFromText(initials) % colors.length][0]
  const textColor = colors[numberFromText(initials) % colors.length][1]

  return (
    <a href="#" class="flex items-center space-x-2">
      <div class="flex-shrink-0">
        <AvatarPill user={user} size={size} forceDefault={forceDefault} />
      </div>
      <div class="text-sm font-medium text-gray-900">{user?.name || user?.email}</div>
    </a>
  )
}

export const AvatarPill = ({ user, size = 'h-7 w-7', forceDefault }) => {
  const initials = getInitials(user?.name || 'UV')

  function numberFromText(text) {
    const charCodes = text
      .split('')
      .map((char) => char.charCodeAt(0))
      .join('')
    return parseInt(charCodes, 10)
  }

  const bgColor = colors[numberFromText(initials) % colors.length][0]
  const textColor = colors[numberFromText(initials) % colors.length][1]

  if (user?.imageUrl) {
    return <img class={`inline-flex items-center justify-center ${size} rounded-full`} src={user.imageUrl} />
  }

  return user?.name && !forceDefault ? (
    <span class={`inline-flex items-center justify-center ${size} rounded-full ${bgColor}  ring-2 ring-white`}>
      <span class={`text-sm font-medium leading-none ${textColor}`}>{initials}</span>
    </span>
  ) : (
    <img class={`inline-flex items-center justify-center ${size} rounded-full`} src="https://res.cloudinary.com/dt2t3yhwi/image/upload/v1611190800/uservitals/uservitals_default_profile_alt_1_f0tysd.svg" />
  )
}

const VoteCount = ({ votes, empty = null }) => {
  const count = votes.length
  const clampedPillCount = clamp(count, 0, 3)

  if (count == 0) {
    return empty
  }

  return (
    <div class="flex items-center space-x-2">
      <div class="flex flex-shrink-0 -space-x-1">
        {take(votes, clampedPillCount).map((c) => (
          <AvatarPill user={c.contact} />
        ))}
      </div>
      {count > 3 && <span class="flex-shrink-0 text-base leading-5 font-medium">+{count - clampedPillCount}</span>}
    </div>
  )
}

export default VoteCount
