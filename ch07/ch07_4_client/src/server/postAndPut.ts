import {getServerUrl} from './getServerUrl'

const postAndPut =
  (methodName: string) =>
  (path: string, data: object, jwt?: string | null | undefined) => {
    let init: RequestInit = {
      method: methodName,
      body: JSON.stringify(data),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin'
    }
    if (jwt) {
      init = {
        ...init,
        headers: {'Content-Type': 'application/json', Authorization: `Bearer ${jwt}`}
      }
    } else init = {...init, headers: {'Content-Type': 'application/json'}}
    return fetch(getServerUrl(path), init)
  }
export const post = postAndPut('POST')
export const put = postAndPut('PUT')
