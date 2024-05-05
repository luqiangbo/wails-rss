import { Button, Affix, Row, Col, Divider, message, Spin, Empty } from 'antd'
import { GithubOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import { mCommon } from './store'
import CMenuList from './components/menuList'
import CMenuListChildren from './components/menuListChildren'
import CHeaders from './components/headers'
import './styles/App.less'

function App() {
  const snapCommon = useSnapshot(mCommon)

  const [state, setState] = useSetState({
    fastList: [
      {
        key: 0,
        value: '所以列表',
      },
      {
        key: 1,
        value: '今日更新',
      },
      {
        key: 2,
        value: '收藏列表',
      },
      {
        key: 3,
        value: '未读列表',
      },
    ],
  })
  const [messageApi, contextHolder] = message.useMessage()

  return (
    <Spin tip='Loading...' spinning={snapCommon.spinning}>
      <div className='rss-app'>
        {contextHolder}
        <CHeaders />
        <main>
          <Row>
            <Col span={4}>
              <Affix offsetTop={50}>
                <div className='menu'>
                  <div className='fast-list'>
                    {state.fastList.map((u) => (
                      <Button block key={u.key} size='large' className='my-1'>
                        {u.value}
                      </Button>
                    ))}
                  </div>
                  <Divider>订阅源</Divider>
                  <CMenuList />
                  <div className='config'>
                    <Button type='dashed' icon={<GithubOutlined />}></Button>
                    <Button type='dashed' icon={<WechatOutlined />}></Button>
                    <Button type='dashed' icon={<MailOutlined />}></Button>
                  </div>
                </div>
              </Affix>
            </Col>
            <Col span={4}>
              <CMenuListChildren />
            </Col>
            <Col span={16}>
              {snapCommon.htmlString ? (
                <div className='intter' dangerouslySetInnerHTML={{ __html: mCommon.htmlString }} />
              ) : (
                <div className='p-10'>
                  <Empty />
                </div>
              )}
            </Col>
          </Row>
        </main>
      </div>
    </Spin>
  )
}

export default App
