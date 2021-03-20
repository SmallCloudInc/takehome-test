import { Link, routes, useParams } from '@redwoodjs/router'
import Navigation from 'src/components/Navigation/Navigation'
import PageHeader from 'src/components/PageHeader/PageHeader'
import SettingsSidebar from 'src/components/SettingsSidebar'

const CoreLayout = ({ children, title, headerBtns, maxWidth, wrapperClasses }) => {
  const { id } = useParams()
  return (
    <>
      <div class="h-screen flex overflow-hidden bg-white antialiased font-sans">
        <div class="hidden md:flex md:flex-shrink-0">
          <Navigation />
        </div>
        <div class="flex flex-col w-0 flex-1 overflow-hidden">
          <main class={`flex-1 relative z-0 overflow-y-auto focus:outline-none ${wrapperClasses}`} tabindex="0">
            <div class={maxWidth || 'max-w-7xl'}>
              <div class="h-screen flex overflow-hidden bg-white antialiased font-sans">
                <div class="hidden md:flex md:flex-shrink-0">
                  <SettingsSidebar />
                </div>
                <div class="flex flex-col w-0 flex-1 overflow-hidden">
                  <PageHeader title={title || 'UserVitals'} children={headerBtns} />
                  <main class={`flex-1 relative z-0 overflow-y-auto focus:outline-none`} tabindex="0">
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default CoreLayout
