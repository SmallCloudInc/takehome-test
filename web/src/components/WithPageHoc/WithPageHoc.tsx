import type { DocumentNode } from 'graphql'

import { useQuery } from '@redwoodjs/web'

export interface OperationResult<TData = any> {
  data?: TData
  loading: boolean
  error?: Error
}

const Query: React.FunctionComponent<{
  query: DocumentNode
  children: (result: OperationResult) => React.ReactElement
}> = ({ children, query, ...rest }) => {
  const result = useQuery(query, rest)
  return children && result ? children(result) : null
}

export type DataObject = { [key: string]: unknown }

export type CellFailureStateComponent = Omit<OperationResult, 'data' | 'loading'>
export type CellLoadingEmptyStateComponent = Omit<OperationResult, 'error' | 'loading' | 'data'>
export type CellSuccessStateComponent = Omit<OperationResult, 'error' | 'loading' | 'data'> | DataObject

export interface WithPageProps {
  beforeQuery?: <TProps>(props: TProps) => { variables: TProps }
  // @ts-expect-error We do not know, and even really care, what they are here.
  QUERY: DocumentNode | (({ variables: unknown }) => DocumentNode)
  afterQuery?: (data: DataObject) => DataObject
  Loading?: React.FC<CellLoadingEmptyStateComponent>
  Failure?: React.FC<CellFailureStateComponent>
  Empty?: React.FC<CellLoadingEmptyStateComponent>
  Success: React.FC<CellSuccessStateComponent>
  Layout: React.FC
}

const LoadingLayoutPulse = () => {
  return (
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-50 opacity-75"></div>
        </div>

        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div class="inline-block align-bottom px-4 pt-5 pb-4 text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div class="mx-auto flex items-center justify-center h-12 w-12 animate-pulse">
              <svg class="h-10 w-10" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33 70.7405H29.16V91.5705C29.1574 93.7789 28.2789 95.8962 26.7173 97.4578C25.1557 99.0194 23.0384 99.8978 20.83 99.9005H0V78.6405C0.112691 76.5074 1.03951 74.4989 2.58937 73.0291C4.13923 71.5592 6.19399 70.7401 8.33 70.7405Z" fill="url(#paint0_linear)" />
                <path
                  d="M62.5 37.4004V79.0704C62.4947 84.5932 60.2984 89.8883 56.3932 93.7936C52.4879 97.6988 47.1928 99.8951 41.67 99.9004H35.24C36.7129 97.3713 37.4893 94.4971 37.49 91.5704V62.4004H8.33C5.40348 62.4025 2.52961 63.1788 0 64.6504L0 57.9004C0.0917568 52.435 2.32615 47.2242 6.22207 43.39C10.118 39.5558 15.3638 37.4049 20.83 37.4004H62.5Z"
                  fill="url(#paint1_linear)"
                />
                <path
                  d="M100 49.9005C99.9918 60.7357 96.4641 71.275 89.948 79.9319C83.4319 88.5888 74.28 94.8948 63.87 97.9005C68.3812 92.6478 70.8642 85.9544 70.87 79.0305V29.0305H20.87C13.9499 29.0279 7.25692 31.5001 2 36.0005C5.36754 24.4543 12.7841 14.5089 22.89 7.98773C32.9958 1.46654 45.1136 -1.1934 57.0217 0.495597C68.9297 2.18459 79.8299 8.10933 87.7237 17.1835C95.6176 26.2577 99.976 37.8733 100 49.9005Z"
                  fill="url(#paint2_linear)"
                />
                <defs>
                  <linearGradient id="paint0_linear" x1="85.22" y1="14.6805" x2="0.00999109" y2="99.8805" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#4F46E5" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="5326.25" y1="961.151" x2="0.625229" y2="6286.15" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#4F46E5" />
                  </linearGradient>
                  <linearGradient id="paint2_linear" x1="8353.56" y1="1446.97" x2="11.4655" y2="9796.57" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#8B5CF6" />
                    <stop offset="1" stop-color="#4F46E5" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <div class="mt-2">
                <p class="text-sm text-gray-400">Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Is a higher-order-component that executes a GraphQL query and automatically
 * manages the lifecycle of that query. If you export named parameters that match
 * the required params of `withCell` it will be automatically wrapped in this
 * HOC via a babel-plugin.
 *
 * @param {string} QUERY - The graphQL syntax tree to execute
 * @param {function=} beforeQuery - Prepare the variables and options for the query
 * @param {function=} afterQuery - Sanitize the data return from graphQL
 * @param {Component=} Loading - Loading, render this component
 * @param {Component=} Empty - Loading, render this component
 * @param {Component=} Failure - Something went wrong, render this component
 * @param {Component} Success - Data has loaded, render this component
 *
 * @example
 * ```js
 * // IMPLEMENTATION:
 * // `src/ExampleComponent/index.js`. This file is automatically dealt with
 * in webpack.
 *
 * import { withCell } from '@redwoodjs/web'
 * import * as cell from './ExampleComponent'
 *
 * export default withCell(cell)
 * ```
 *
 * // USAGE:
 * // Now you have a cell component that will handle the lifecycle methods of
 * // a query
 * import ExampleComponent from 'src/ExampleComponent'
 *
 * const ThingThatUsesExampleComponent = () => {
 *  return <div><ExampleComponent /></div>
 * }
 */
export const withPage = ({
  beforeQuery = (props) => ({
    variables: props,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }),
  QUERY,
  afterQuery = (data) => ({ ...data }),
  Loading = () => <LoadingLayoutPulse />,
  Failure,
  Empty,
  Success,
  Layout,
}: WithPageProps) => {
  const isDataNull = (data: DataObject) => {
    return dataField(data) === null
  }

  const isDataEmptyArray = (data: DataObject) => {
    const field = dataField(data)
    return Array.isArray(field) && field.length === 0
  }

  const dataField = (data: DataObject) => {
    return data[Object.keys(data)[0]]
  }

  const isEmpty = (data: DataObject) => {
    return isDataNull(data) || isDataEmptyArray(data)
  }

  return (props: Record<string, unknown>) => (
    <Layout {...props}>
      <Query query={typeof QUERY === 'function' ? QUERY(beforeQuery(props)) : QUERY} {...beforeQuery(props)}>
        {({ error, loading, data, ...queryRest }) => {
          if (error) {
            if (Failure) {
              return <Failure error={error} {...queryRest} {...props} />
            } else {
              throw error
            }
          } else if (loading) {
            return <Loading {...queryRest} {...props} />
          } else if (data) {
            if (typeof Empty !== 'undefined' && isEmpty(data)) {
              return <Empty {...queryRest} {...props} />
            } else {
              return <Success {...afterQuery(data)} {...queryRest} {...props} />
            }
          } else {
            throw new Error('Cannot render cell: GraphQL success but `data` is null')
          }
        }}
      </Query>
    </Layout>
  )
}
