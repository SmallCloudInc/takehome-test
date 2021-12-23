import CoreLayout from 'src/layouts/CoreLayout'
import { withPage } from 'src/components/WithPageHoc'

import ContainerLayout from 'src/layouts/ContainerLayout/ContainerLayout'

export const QUERY = gql`
  query FeedbackListQuery {
    feedbacks {
      id
      text
      createdAt
    }
  }
`
const FeedbackItem = ({ fb }) => {
  return (
    <div className="space-y-3">
      <div className="">ID: {fb.id}</div>
      <div className="">Create At: {fb.createdAt}</div>
      <div className="">Text: {fb.text}</div>
    </div>
  )
}

export const Layout = ({ children }) => {
  return <CoreLayout title={'Incoming feedback'}>{children}</CoreLayout>
}

export const Empty = () => {
  const headerBtns = (
    <>
      <span className="rounded-md shadow-sm order-0 sm:order-1 sm:ml-3">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700">
          Add insight
        </button>
      </span>
    </>
  )
  return (
    <ContainerLayout headerBtns={headerBtns}>
      <div className="grid">
        <div className="divide-y">
          <p className="px-6 py-3 leading-5 text-gray-500 whitespace-nowrap">
            No insights added yet
          </p>
        </div>
      </div>
    </ContainerLayout>
  )
}

export const Failure = ({ error }) => <div>Error: {error.message}</div>

const Success = ({ feedbacks }) => {
  const headerBtns = (
    <>
      <span className="rounded-md shadow-sm order-0 sm:order-1 sm:ml-3">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700">
          Add insight
        </button>
      </span>
    </>
  )
  return (
    <ContainerLayout maxWidth="max-w-full" headerBtns={headerBtns}>
      <div className="grid">
        <div className="divide-y">
          {feedbacks.map((fb) => (
            <FeedbackItem key={fb.id} fb={fb} />
          ))}
        </div>
      </div>
    </ContainerLayout>
  )
}

export const Loading = () => {
  const headerBtns = (
    <>
      <span className="rounded-md shadow-sm order-0 sm:order-1 sm:ml-3">
        <button className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-purple-600 border border-transparent rounded-md hover:bg-purple-500 focus:outline-none focus:shadow-outline-purple focus:border-purple-700 active:bg-indigo-700">
          Add insight
        </button>
      </span>
    </>
  )
  return (
    <ContainerLayout maxWidth="max-w-full" headerBtns={headerBtns}>
      <div className="grid">
        <div className="divide-y">
          <table className="min-w-full">
            <tbody className="px-6 py-3 bg-white divide-y divide-gray-100">
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
              <td className="hidden px-6 py-3 leading-5 text-gray-500 md:table-cell">
                <div className="flex space-x-4 animate-pulse">
                  <div className="flex-1 py-1 space-y-4">
                    <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </ContainerLayout>
  )
}

export default withPage({
  QUERY,
  Success,
  Failure,
  Loading,
  Empty,
  Layout,
})
