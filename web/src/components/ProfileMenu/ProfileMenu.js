import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { useAuth } from '@redwoodjs/auth'

const ProfileMenu = () => {
  const { logOut, currentUser } = useAuth()
  const [show, setShow] = useState(false)
  return (
    <div class="px-3 mt-6 relative inline-block text-left">
      <div>
        <button
          onClick={() => setShow(!show)}
          type="button"
          class="group w-full rounded-md px-3.5 py-2 text-sm leading-5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-500 focus:outline-none focus:bg-gray-200 focus:border-blue-300 active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <div class="flex w-full justify-between items-center">
            <div class="flex min-w-0 items-center justify-between space-x-3">
              <span class="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 border">
                <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
              <div class="flex-1 min-w-0 px-2">
                <h2 class="text-gray-900 text-sm leading-5 font-medium truncate text-left">{currentUser.name}</h2>
                <p class="text-gray-500 text-sm leading-5 truncate text-left">{currentUser.currentTeam.name}</p>
              </div>
            </div>
            <svg class="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
      <Transition show={show} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
        <div class="z-10 mx-3 origin-top absolute right-0 left-0 bottom-16 mt-1 rounded-md shadow-lg">
          <div class="rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div class="px-4 py-3">
              <p class="text-sm leading-5">Signed in as</p>
              <p class="text-sm leading-5 font-medium text-gray-900 truncate">{currentUser.email}</p>
            </div>
            <div class="border-t border-gray-100"></div>
            <div class="border-t border-gray-100"></div>
            <div class="py-1">
              <button onClick={logOut} class="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900" role="menuitem">
                Sign out
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  )
}

export default ProfileMenu
