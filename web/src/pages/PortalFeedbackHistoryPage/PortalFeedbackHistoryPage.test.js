import { render } from '@redwoodjs/testing'

import PortalFeedbackHistoryPage from './PortalFeedbackHistoryPage'

describe('PortalFeedbackHistoryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PortalFeedbackHistoryPage />)
    }).not.toThrow()
  })
})
