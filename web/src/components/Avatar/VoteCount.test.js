import { render } from '@redwoodjs/testing'

import VoteCount from './Avatar'

describe('VoteCount', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<VoteCount />)
    }).not.toThrow()
  })
})
