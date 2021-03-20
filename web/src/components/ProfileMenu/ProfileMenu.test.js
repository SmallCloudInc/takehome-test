import { render } from '@redwoodjs/testing'

import ProfileMenu from './ProfileMenu'

describe('ProfileMenu', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProfileMenu />)
    }).not.toThrow()
  })
})
