/* eslint-disable no-undef */
import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/dashboard" page={HomePage} name="dashboard" />
      <Route path="/feedback" page={FeedbackPage} name="feedback" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
