import { render } from '@redwoodjs/testing'

import PortalHeader from './PortalHeader'

describe('PortalHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalHeader />)
    }).not.toThrow()
  })
})
