import { Button, Affix, Row, Col, Divider, message, Input, Tree } from 'antd'
import { GithubOutlined, WechatOutlined, MailOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'

import MenuTree from './components/menuTree'
import imgLogo from './assets/images/logo.png'
import './styles/App.less'

function App() {
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
    <div className='rss-app'>
      {contextHolder}
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
              <div className='header-2'> 标题</div>
            </Col>
            <Col span={16}>
              <div className='header-3'></div>
            </Col>
          </Row>
        </header>
      </Affix>

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
                <MenuTree />
                <div className='config'>
                  <Button type='dashed' icon={<GithubOutlined />}></Button>
                  <Button type='dashed' icon={<WechatOutlined />}></Button>
                  <Button type='dashed' icon={<MailOutlined />}></Button>
                </div>
              </div>
            </Affix>
          </Col>
          <Col span={4}>
            <Affix offsetTop={50}>
              <div className='menu-detail'>123</div>
            </Affix>
          </Col>
          <Col span={16}>
            <div className='intter'>1234</div>
          </Col>
        </Row>
      </main>
    </div>
  )
}

export default App
