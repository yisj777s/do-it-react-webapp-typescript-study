import {useState, useCallback} from 'react'
import {put} from '../../server'
import * as D from '../../data'
import {Button} from '../../theme/daisyui'
import {useAuth} from '../../contexts'

type Body = Record<'id' | string, any>
type Data = {
  ok: boolean
  body?: Body
  errorMessage?: string
}
export default function PutTest() {
  const {jwt} = useAuth()
  const [data, setData] = useState<Data | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const putTest = useCallback(() => {
    put('/test/1234', D.makeRandomCard(), jwt)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setErrorMessage(error.message))
  }, [jwt])

  return (
    <div>
      <div className="mb-4">
        <div className="flex justify-center mb-4">
          <Button onClick={putTest} className="btn-primary">
            PUT ID 1234
          </Button>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p>id: {data?.body?.id}</p>
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  )
}
