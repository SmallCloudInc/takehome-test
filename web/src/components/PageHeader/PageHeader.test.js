import { render } from '@redwoodjs/testing'

import PageHeader from './PageHeader'

describe('PageHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PageHeader />)
    }).not.toThrow()
  })
})
