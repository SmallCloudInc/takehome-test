import PageHeader from 'src/components/PageHeader/PageHeader'

const ContainerLayout = ({ children, headerBtns, wrapperClasses, maxWidth, title }) => {
  return (
    <main className={`flex-1 relative z-0 overflow-y-auto focus:outline-none ${wrapperClasses}`} tabIndex="0">
      {headerBtns && <PageHeader title={title || 'UserVitals'} children={headerBtns} />}
      <div className={maxWidth || 'max-w-7xl'}>{children}</div>
    </main>
  )
}

export default ContainerLayout
