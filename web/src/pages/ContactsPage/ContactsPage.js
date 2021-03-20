import { Link, routes } from '@redwoodjs/router'

const ContactsPage = () => {
  return (
    <>
      <h1>ContactsPage</h1>
      <p>
        Find me in <code>./web/src/pages/ContactsPage/ContactsPage.js</code>
      </p>
      <p>
        My default route is named <code>contacts</code>, link to me with `<Link to={routes.contacts()}>Contacts</Link>`
      </p>
    </>
  )
}

export default ContactsPage
