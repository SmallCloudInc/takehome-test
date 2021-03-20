import { render } from '@redwoodjs/testing'

import LogoutPage from './LogoutPage'

describe('LogoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogoutPage />)
    }).not.toThrow()
  })
})
