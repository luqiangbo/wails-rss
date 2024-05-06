import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Empty } from 'antd'

import { mCommon, mUser } from '../store'

const App = () => {
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  return (
    <>
      {snapCommon.htmlString ? (
        <div className='intter' dangerouslySetInnerHTML={{ __html: mCommon.htmlString }} />
      ) : (
        <div className='p-10'>
          <Empty />
        </div>
      )}
    </>
  )
}
export default App
