import { ModalWrapper, Reoverlay } from 'reoverlay'
import { Form, TextField, TextAreaField, Submit, SelectField, HiddenField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useAuth } from '@redwoodjs/auth'

const CREATE_FEEDBACK = gql`
  mutation CreateFeedbackItemWithInput($input: CreateFeedbackInput!) {
    createFeedback(input: $input) {
      __typename
      id
    }
  }
`

const PortalFeedbackModal = ({ type, apiKey }) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

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

  const textMapping = {
    idea: {
      title: 'Suggest an idea',
      type: 'IDEA',
      placeholder: 'Have a great suggestion? Share it here',
    },
    issue: {
      title: 'Report an issue',
      type: 'ISSUE',
      placeholder: 'Something not quite right? Let us know',
    },
  }

  return (
    <ModalWrapper class="rounded-lg">
      <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <Form class="space-y-6" onSubmit={onSubmit}>
          <div class="space-y-1">
            <h1 class="text-lg leading-6 font-medium text-gray-900">{textMapping[type].title}</h1>
            <p class="text-sm leading-5 text-gray-500">Fill in the information below and we will be in touch!</p>
          </div>
          <div class="space-y-1">
            <TextAreaField id="text" rows="5" className="block w-full mt-1 bg-gray-100 border-transparent rounded-md focus:ring-gray-500 focus:bg-white focus:ring-1" type="text" name="text" placeholder={textMapping[type].placeholder} />
          </div>
          <HiddenField name="metaData.device.path" value={window.location.origin} />
          <HiddenField name="metaData.props.name" value={currentUser.name} />
          <HiddenField name="metaData.props.email" value={currentUser.email} />
          <HiddenField name="apiKey" value={apiKey} />
          <HiddenField name="type" value={textMapping[type].type} />
          <div class="flex justify-end">
            <span class="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => Reoverlay.hideModal()}
                class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-light-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition duration-150 ease-in-out"
              >
                Cancel
              </button>
            </span>
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <Submit class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-purple-500 hover:bg-purple-400 focus:outline-none focus:border-light-blue-600 focus:shadow-outline-blue active:bg-purple-600 transition duration-150 ease-in-out">
                Submit
              </Submit>
            </span>
          </div>
        </Form>
      </div>
    </ModalWrapper>
  )
}

export default PortalFeedbackModal
