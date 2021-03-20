import { ModalWrapper, Reoverlay } from 'reoverlay'
import { Form, TextField, TextAreaField, Submit, SelectField, HiddenField, PasswordField, CheckboxField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { Link, routes, navigate } from '@redwoodjs/router'

const CREATE_FEEDBACK = gql`
  mutation CreateFeedbackItemWithInput($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      __typename
      id
    }
  }
`

const LoginCell = ({ setPage }) => {
  const { client } = useAuth()
  const [error, setError] = React.useState(null)

  const onSubmit = (data) => {
    setError(null)
    client
      .login({ email: data.email, password: data.password, remember: true })
      .then(() => navigate(routes.portalHomePage()))
      .catch((error) => setError(error.message))
  }

  return (
    <div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-medium text-gray-600">Sign in to your account</h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Or
          <a onClick={() => setPage('signup')} class="font-medium text-indigo-600 hover:text-indigo-500 pl-1">
            create an account
          </a>
        </p>
      </div>
      <Form class="space-y-6 mt-3" onSubmit={onSubmit}>
        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <TextField id="email" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="email" />
        </div>
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <PasswordField id="text" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="password" name="password" />
        </div>
        <div class="flex items-center justify-between">
          {/* <div class="flex items-center">
            <CheckboxField id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 ring-gray-300 ring-1 rounded"/>
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div> */}
          {error && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {error}
            </p>
          )}
        </div>

        <div>
          <Submit type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign in
          </Submit>
        </div>
      </Form>
    </div>
  )
}

const SignupEmailCell = ({ setPage }) => {
  const [createItem, { loading, error }] = useMutation(CREATE_FEEDBACK, {
    onCompleted: () => {
      window.location.reload()
    },
  })

  const onSubmit = (data) => {
    createItem({
      variables: { input: data },
    })
  }
  return (
    <div>
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="text-center text-3xl font-extrabold text-gray-900 px-9">Create an account</h2>
        <p class="mt-2 text-center text-sm text-gray-600 max-w">
          Already have an account?
          <a onClick={() => setPage('login')} class="font-medium text-indigo-600 hover:text-indigo-500 pl-1">
            Login
          </a>
        </p>
      </div>
      <Form class="space-y-6 mt-3" onSubmit={onSubmit}>
        <div class="space-y-1">
          <label for="name" class="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <TextField id="name" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="name" />
        </div>
        <div class="space-y-1">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <TextField id="email" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="text" name="email" />
        </div>
        <div class="space-y-1">
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <PasswordField id="password" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="password" name="password" />
        </div>
        <div class="space-y-1">
          <label for="confirm" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <PasswordField id="confirm" rows="5" className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type="password" name="confirm" />
        </div>
        {/* <div class="flex items-center justify-between">
          <div class="flex items-center">
            <CheckboxField id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div> */}
        <div>
          <Submit type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Sign in
          </Submit>
        </div>
      </Form>
    </div>
  )
}

const PortalLoginSignUpModal = () => {
  const [page, setPage] = useState('login')
  return (
    <ModalWrapper class="rounded-lg">
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        {page == 'signup' && <SignupEmailCell setPage={setPage} />}
        {page == 'login' && <LoginCell setPage={setPage} />}
      </div>
    </ModalWrapper>
  )
}

export default PortalLoginSignUpModal
