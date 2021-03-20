import { Link, routes, navigate, useParams } from '@redwoodjs/router'
import { Form, TextField, PasswordField, Submit } from '@redwoodjs/forms'
import { useAuth } from '@redwoodjs/auth'
import { useFlash } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { useEffect } from 'react'

const SIGN_UP = gql`
  mutation CreateFeedbackItemWithInput($input: AccountSignupInput!, $code: String, $state: String) {
    accountSignupAdmin(input: $input, code: $code, state: $state) {
      name
      email
      password
      company
      subdomain
      redirect
    }
  }
`

const SignupPage = () => {
  const { isAuthenticated, currentUser } = useAuth()
  const [error, setError] = React.useState(null)
  const [showVerifyEmail, setVerifyEmail] = React.useState(false)
  const pageParams = useParams()

  const [createItem, { loading, _ }] = useMutation(SIGN_UP, {
    onError: (error) => {
      setError(error.message)
    },
    onCompleted: async (data) => {
      if (data.accountSignupAdmin.redirect) {
        await window.location.replace(data.accountSignupAdmin.redirect)
      } else {
        setVerifyEmail(true)
      }
    },
  })

  const onSubmit = (data) => {
    createItem({
      variables: { input: data, code: pageParams?.code, state: pageParams?.state },
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.dashboard({ workspace: currentUser.defaultWorkspace }))
    }
  }, [isAuthenticated, currentUser])

  if (showVerifyEmail) {
    return (
      <div class="min-h-screen bg-white flex">
        <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div class="mx-auto w-full max-w-sm lg:w-96">
            <div class="mt-8">
              <div class="mt-6">
                <div>
                  <div>
                    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                        Verify your email
                      </h3>
                      <div class="mt-2">
                        <p class="text-sm leading-5 text-gray-500">Thanks so much for joining UserVitals. To finish signing up, please verify your email address. Check your inbox for a verification link.</p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6">
                    <span class="flex w-full rounded-md shadow-sm">
                      <Link
                        to={routes.login()}
                        class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-indigo-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      >
                        Go back to login
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="hidden lg:block relative w-0 flex-1">
          <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
        </div>
      </div>
    )
  }

  return (
    <div class="min-h-screen bg-white flex">
      <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-12 w-auto" src="https://d33wubrfki0l68.cloudfront.net/02931d36f812dbcc6a3e41f05d133a7cdcace063/949ca/images/stickers.png" alt="UserVitals" />
            <h2 class="mt-6 text-3xl leading-9 text-gray-900">Create an account</h2>
            <p class="mt-2 text-sm leading-5 text-gray-600 max-w">
              OR &nbsp;
              <Link to={routes.login()} class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                login with your account
              </Link>
            </p>
          </div>

          <div class="mt-8">
            <div class="mt-6">
              <Form onSubmit={onSubmit} className="space-y-6">
                {error && (
                  <p className="mt-2 text-sm text-red-600" id="email-error">
                    {error}
                  </p>
                )}
                <div>
                  <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                    Name
                  </label>
                  <div class="flex mt-1 rounded-md shadow-sm">
                    <TextField
                      id="name"
                      type="text"
                      name="name"
                      required
                      autoComplete={false}
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <label for="name" class="block text-sm font-medium leading-5 text-gray-700">
                    Company name
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <TextField
                      id="company"
                      type="text"
                      name="company"
                      required
                      autoComplete={false}
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                <div>
                  <label for="subdomain" class="block text-sm font-medium leading-5 text-gray-700">
                    Subdomain
                  </label>
                  <div class="flex mt-1 rounded-md shadow-sm">
                    <TextField
                      id="subdomain"
                      type="text"
                      name="subdomain"
                      required
                      autoComplete={false}
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-none rounded-l-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 lowercase"
                    />
                    <span class="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">.uservitals.io</span>
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-5 text-gray-700">
                    Email
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      required
                      class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 lowercase"
                    />
                  </div>
                </div>
                <div>
                  <label for="password" class="block text-sm font-medium leading-5 text-gray-700">
                    Password
                  </label>
                  <div class="mt-1 rounded-md shadow-sm">
                    <PasswordField
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full px-3 py-2 placeholder-gray-400 transition duration-150 ease-in-out border border-gray-300 rounded-md appearance-none focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {/* <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <input
                        id="remember_me"
                        type="checkbox"
                        class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <label
                        for="remember_me"
                        class="ml-2 block text-sm leading-5 text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div class="text-sm leading-5">
                      <a
                        href="#"
                        class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div> */}

                <div>
                  <span class="block w-full rounded-md shadow-sm">
                    <Submit
                      type="submit"
                      class="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Sign Up
                    </Submit>
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block relative w-0 flex-1">
        <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
      </div>
    </div>
  )
}

export default SignupPage
