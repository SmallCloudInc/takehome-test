import { render } from '@redwoodjs/testing'

import PortalLayout from './PortalLayout'

describe('PortalLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalLayout />)
    }).not.toThrow()
  })
})
