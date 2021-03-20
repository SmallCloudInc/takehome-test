import { render } from '@redwoodjs/testing'

import PortalHomePagePage from './PortalHomePagePage'

describe('PortalHomePagePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalHomePagePage />)
    }).not.toThrow()
  })
})
