import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Button } from 'antd'

import { leancloudAdd, leancloudFindEqual } from '../utils/index'
import { mUser } from '../store'

const App = () => {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  const onAdd = () => {
    console.log('点击')
    leancloudAdd({ a: 1, abc: 'fssd', ffdf: [1, 2, 3] }, (res) => {
      console.log({ res })
    })
  }

  const onEqual = () => {
    leancloudFindEqual('objectId', '663b376962f81901d7174a2a', (res) => {
      console.log({ res })
    })
  }

  return (
    <div className='header-3'>
      {/* <Button onClick={onAdd}>onAdd</Button>
      <Button onClick={onEqual}>onEqual</Button> */}
    </div>
  )
}
export default App
