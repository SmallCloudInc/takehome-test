import { render } from '@redwoodjs/testing'

import PortalFeedbackModal from './PortalFeedbackModal'

describe('PortalFeedbackModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalFeedbackModal />)
    }).not.toThrow()
  })
})
