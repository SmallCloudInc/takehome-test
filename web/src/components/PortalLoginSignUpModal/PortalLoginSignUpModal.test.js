import { render } from '@redwoodjs/testing'

import PortalLoginSignUpModal from './PortalLoginSignUpModal'

describe('PortalLoginSignUpModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalLoginSignUpModal />)
    }).not.toThrow()
  })
})
