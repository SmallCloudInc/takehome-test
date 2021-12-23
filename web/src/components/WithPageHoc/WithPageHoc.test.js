import { render } from '@redwoodjs/testing'

import WithPageHOC from './WithPageHOC'

describe('WithPageHOC', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WithPageHOC />)
    }).not.toThrow()
  })
})
