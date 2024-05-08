import React, { useEffect } from 'react'
import { Affix, Row, Col } from 'antd'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import CHeadersRight from './headersRight'
import imgLogo from '../assets/images/logo.png'

import { mUser } from '../store'

const App = () => {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  return (
    <>
      <Affix offsetTop={0}>
        <header>
          <Row>
            <Col span={4}>
              <div className='header-1'>
                <img src={imgLogo} className='logo' />
                ails-rss
              </div>
            </Col>
            <Col span={4}>
              <div className='header-2'>{snapUser.menuListTitle} </div>
            </Col>
            <Col span={16}>
              <CHeadersRight />
            </Col>
          </Row>
        </header>
      </Affix>
    </>
  )
}
export default App
