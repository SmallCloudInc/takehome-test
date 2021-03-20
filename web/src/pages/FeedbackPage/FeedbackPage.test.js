import { render } from '@redwoodjs/testing'

import FeedbackPage from './FeedbackPage'

describe('FeedbackPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackPage />)
    }).not.toThrow()
  })
})
