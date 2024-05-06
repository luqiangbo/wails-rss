import { Row, Col, Spin } from 'antd'
import { useSnapshot } from 'valtio'

import { mCommon } from './store'
import CMenuList from './components/menuList'
import CMenuListChildren from './components/menuListChildren'
import CMenuDescription from './components/menuDescription'
import CHeaders from './components/headers'
import './styles/App.less'

function App() {
  const snapCommon = useSnapshot(mCommon)

  return (
    <Spin tip='Loading...' spinning={snapCommon.spinning}>
      <div className='rss-app'>
        <CHeaders />
        <main>
          <Row>
            <Col span={4}>
              <CMenuList />
            </Col>
            <Col span={4}>
              <CMenuListChildren />
            </Col>
            <Col span={16}>
              <CMenuDescription />
            </Col>
          </Row>
        </main>
      </div>
    </Spin>
  )
}

export default App
