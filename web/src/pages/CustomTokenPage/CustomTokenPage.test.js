import { render } from '@redwoodjs/testing'

import CustomTokenPage from './CustomTokenPage'

describe('CustomTokenPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CustomTokenPage />)
    }).not.toThrow()
  })
})
