import { useState } from 'react'
import { Button, Input, Row, Col } from 'antd'

import './App.less'

function App() {
  return (
    <div id='App'>
      <Row>
        <Col span={6}>
          <div className='p-3'>
            <Input placeholder='Please Input' />
          </div>
        </Col>
        <Col span={18}>
          <Button type='primary'>Button</Button>
        </Col>
      </Row>
    </div>
  )
}

export default App
