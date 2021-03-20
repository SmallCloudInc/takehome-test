import { render } from '@redwoodjs/testing'

import FeedbackEditMenu from './FeedbackEditMenu'

describe('FeedbackEditMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<FeedbackEditMenu />)
    }).not.toThrow()
  })
})
