import { render } from '@redwoodjs/testing'

import HomeSwitchPage from './HomeSwitchPage'

describe('HomeSwitchPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<HomeSwitchPage />)
    }).not.toThrow()
  })
})
