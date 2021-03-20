import { render } from '@redwoodjs/testing'

import AdminSidebarLayout from './AdminSidebarLayout'

describe('AdminSidebarLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminSidebarLayout />)
    }).not.toThrow()
  })
})
