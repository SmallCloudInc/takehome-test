/* eslint-disable no-undef */
import { Router, Route } from '@redwoodjs/router'

const userRouteParamTypes = {
  slug: {
    constraint: /\w+-\w+/,
    transform: (param) => param,
  },
}

const Routes = () => {
  return (
    <Router>
      <Route path="/dashboard" page={HomePage} name="dashboard" />
      <Route path="/feedback" page={FeedbackPage} name="feedback" />
    </Router>
  )
}

export default Routes
