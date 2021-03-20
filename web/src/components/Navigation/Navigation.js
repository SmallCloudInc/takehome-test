import { Link, routes, useMatch } from '@redwoodjs/router'

const CustomLink = ({ to, children }) => {
  const matchInfo = useMatch(to)
  const activeClassName = 'group flex items-center px-2 py-2 text-lg leading-5 font-medium text-indigo-600 rounded-md focus:outline-none bg-gray-200 transition ease-in-out duration-150'
  const inActiveClassName = 'group flex items-center px-2 py-2 text-lg leading-5 text-gray-600 rounded-md hover:text-indigo-600 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150'
  if (matchInfo.match) {
    return (
      <Link to={to} className={activeClassName}>
        {children}
      </Link>
    )
  } else {
    return (
      <Link to={to} className={inActiveClassName}>
        {children}
      </Link>
    )
  }
}

const Navigation = () => {
  return (
    <div className="flex flex-col flex-grow w-64 min-h-screen pb-4 border-r border-gray-200 bg-gray-50">
      <div className="flex flex-col flex-grow pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 px-4">
          <img src="https://d33wubrfki0l68.cloudfront.net/492ed629970792d32ac857da0166a7d2308bad99/428b6/images/diecut.svg" alt="Redwood Logo" className="w-2/3 mx-auto" />
        </div>
        <nav className="flex flex-col justify-between flex-1 px-2 mt-5 bg-gray-50">
          <div className="space-y-2">
            <CustomLink to={routes.dashboard()}>
              <svg className="w-6 h-6 mr-3 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Dashboard
            </CustomLink>
            <CustomLink to={routes.feedback()}>
              <svg className="w-6 h-6 mr-3 transition duration-150 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
              Insights
            </CustomLink>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navigation
