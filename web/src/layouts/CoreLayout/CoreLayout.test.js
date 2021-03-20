import { render } from '@redwoodjs/testing'

import CoreLayout from './CoreLayout'

describe('CoreLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CoreLayout />)
    }).not.toThrow()
  })
})
