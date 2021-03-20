import { Menu, Transition } from '@headlessui/react'

export const ChangelogTypeMenuItem = () => {
  return (
    <div className="inline-flex items-center px-2 py-1 text-base leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border border-transparent border-gray-200 rounded cursor-pointer hover:border hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
      <svg className="w-5 h-5 text-gray-400 fill-current" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 19">
        <path d="M14.615 3.76a1.951 1.951 0 00-2.76 0L4.12 11.494a.433.433 0 00-.11.191l-1.018 3.672a.433.433 0 00.533.534l3.673-1.018a.434.434 0 00.19-.111l7.736-7.735c.76-.762.76-1.996 0-2.759l-.51-.508zm-9.55 8.016l6.33-6.33 2.042 2.041-6.33 6.33-2.042-2.041zm-.408.818l1.631 1.631-2.256.625.625-2.256zm9.853-6.18l-.46.46-2.041-2.042.46-.46a1.084 1.084 0 011.533 0l.508.51c.423.423.423 1.109 0 1.532z" />
      </svg>
      <p className="ml-2 group-hover:text-gray-700">Edit</p>
    </div>
  )
}

const ChangelogTypeMenu = ({ onEditInsightBtn, onDelete, id }) => {
  const ICONS = {
    Edit: (
      <svg className="flex items-center w-5 h-5 space-x-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    Share: (
      <svg className="flex items-center w-5 h-5 space-x-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    Delete: (
      <svg fill="none" className="w-5 h-5 stroke-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
        <path d="M11.146 3.68h-.5v8.859a.895.895 0 01-.894.893H2.786a.895.895 0 01-.893-.893v-8.86H.5v-.393h2.786V1.393c0-.492.401-.893.894-.893h4.18c.491 0 .892.401.892.893v1.893h2.787v.394h-.893zM4.18.893h-.5v2.393h5.18V.893H4.18zm6.072 3.287v-.5H2.286v9.359h7.967v-8.86zM4.68 6.073h.393v4.572H4.68V6.074zm2.786 0h.393v4.572h-.393V6.074z" />
      </svg>
    ),
  }

  return (
    <div className="flex mt-2">
      <div className="relative inline-block text-left">
        <Menu>
          {({ open }) => (
            <>
              <Menu.Button className="inline-flex items-center justify-center mr-4 text-sm leading-5 text-gray-500 transition duration-150 ease-in-out bg-white border-transparent rounded hover:border hover:border-gray-300 hover:text-gray-800 hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                <ChangelogTypeMenuItem />
              </Menu.Button>
              <Transition show={open} enter="transition duration-100 ease-out" enterFrom="transform scale-95 opacity-0" enterTo="transform scale-100 opacity-100" leave="transition duration-75 ease-out" leaveFrom="transform scale-100 opacity-100" leaveTo="transform scale-95 opacity-0">
                <Menu.Items static className="absolute right-0 z-50 w-56 mt-1 mr-4 origin-left shadow-lg outline-none">
                  <div className="py-1 bg-white border rounded-md">
                    <Menu.Item className="relative inline-flex items-center w-full px-4 py-2 leading-5 text-left cursor-default">
                      <a className={` text-gray-400 inline-flex items-center w-full px-4 py-2 leading-5 text-left relative`}>
                        <div className="text-base font-light text-gray-400">Edit...</div>
                      </a>
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a onClick={() => onEditInsightBtn()} className={`${active ? 'bg-purple-100 text-purple-600' : 'text-gray-400'} cursor-pointer inline-flex items-center w-full px-4 py-2 text-sm leading-5 text-left relative`}>
                          <div className="flex items-center space-x-2 ">{ICONS['Edit']}</div>
                          <div className={`${active ? ' text-purple-600' : 'text-gray-500'} ml-3.5 text-base font-light `}>Edit</div>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a className={`${active ? 'bg-purple-100 text-purple-600' : 'text-gray-400'} cursor-pointer inline-flex items-center w-full px-4 py-2 text-sm leading-5 text-left relative`}>
                          <div className="flex items-center space-x-2 ">{ICONS['Share']}</div>
                          <div className={`${active ? ' text-purple-600' : 'text-gray-500'} ml-3.5 text-base font-light `}>Share</div>
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a onClick={() => onDelete(id)} className={`${active ? 'bg-purple-100 text-purple-600' : 'text-gray-400'} cursor-pointer inline-flex items-center w-full px-4 py-2 text-sm leading-5 text-left relative`}>
                          <div className="flex items-center space-x-2 ">{ICONS['Delete']}</div>
                          <div className={`${active ? ' text-purple-600' : 'text-gray-500'} ml-3.5 text-base font-light `}>Delete</div>
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </div>
  )
}

export default ChangelogTypeMenu
