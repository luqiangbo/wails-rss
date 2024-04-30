import { Button, Affix, Row, Col, Tabs, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'

import ModalUpdate from './components/modalUpdate'
import imgLogo from './assets/images/logo.png'
import './styles/App.less'

import { RssFeedAdd } from '../wailsjs/go/main/App'

function App() {
  const [state, setState] = useSetState({
    isModalUpdate: false,
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
          <div className='left'>
            <img src={imgLogo} className='logo' />
            ails-rss
          </div>
          <div className='right'></div>
        </header>
      </Affix>

      <main>
        <Row>
          <Col span={4}>
            <Affix offsetTop={50}>
              <div className='menu'>
                <div className='fast-list'>
                  <Tabs
                    tabPosition='left'
                    items={state.fastList.map((u) => {
                      return {
                        label: u.value,
                        key: u.key,
                        children: ``,
                      }
                    })}
                  />
                </div>

                <div className='take'>
                  <div>订阅源</div>
                  <div>
                    <Button
                      icon={<PlusOutlined />}
                      onClick={() => {
                        setState({
                          isModalUpdate: true,
                        })
                      }}
                    />
                    <Button icon={<SearchOutlined />} />
                  </div>
                </div>
                <div className='config'>
                  <Button type='primary'>Button</Button>
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
      {state.isModalUpdate && (
        <ModalUpdate
          onCancel={() => {
            setState({
              isModalUpdate: false,
            })
          }}
          onOk={(url) => {
            RssFeedAdd(url).then((res) => {
              console.log({ res })
              // message.info(res)
            })

            setState({
              isModalUpdate: false,
            })
          }}
        />
      )}
    </div>
  )
}

export default App
