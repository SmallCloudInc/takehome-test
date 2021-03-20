// import Alert from 'src/components/Alert/Alert'

const PageHeader = ({ title, children }) => {
  return (
    <div class="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
      <div class="flex-1 min-w-0"></div>
      <div class="fixed right-5  sm:ml-4">
        {/* <Alert /> */}
      </div>
      <div class="mt-4 flex sm:mt-0 sm:ml-4">{children}</div>
    </div>
  )
}

export default PageHeader
