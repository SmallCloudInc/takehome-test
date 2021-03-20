import { AuthProvider } from '@redwoodjs/auth'
import ReactDOM from 'react-dom'
import { RedwoodProvider, FatalErrorBoundary } from '@redwoodjs/web'
import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'
import { ModalContainer } from 'reoverlay'
import './index.css'

import * as firebase from 'firebase/app'
import 'firebase/auth'

import { firebase as customFirebaseAuthClient } from './firebase.custom.authClient.ts'

const firebaseClientConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
}

const firebaseClient = ((config) => {
  firebase.default.initializeApp(config)
  return firebase.default
})(firebaseClientConfig)

const rwAuthClient = customFirebaseAuthClient(firebaseClient)

ReactDOM.render(
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={rwAuthClient} type="custom">
      <RedwoodProvider>
        <Routes />
        <ModalContainer />
      </RedwoodProvider>
    </AuthProvider>
  </FatalErrorBoundary>,
  document.getElementById('redwood-app')
)
