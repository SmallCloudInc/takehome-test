import { render } from '@redwoodjs/testing'

import SignoutBtn from './SignoutBtn'

describe('SignoutBtn', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignoutBtn />)
    }).not.toThrow()
  })
})
