import React, { useEffect } from 'react'
import { Row, Col } from 'antd'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CHeadersRight from './headersRight'
import imgLogo from '../assets/images/logo.png'
import { mUser, mUserActions } from '../store'
import _ from '../utils/lodash'

const App = () => {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})
  useEffect(() => {}, [])

  return (
    <>
      <header>
        <Row>
          <Col span={4}>
            <div className='header-1'>
              <img src={imgLogo} className='logo' />
            </div>
          </Col>
          <Col span={4}>
            <div className='header-2'>{snapUser.activeTitle} </div>
          </Col>
          <Col span={16}>
            <CHeadersRight />
          </Col>
        </Row>
      </header>
    </>
  )
}
export default App
