import React, { useEffect } from 'react'
import { Collapse, Input, Button, Dropdown } from 'antd'
import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import { mUser } from '../store'
import ModalUpdate from './modalUpdate'
import { generateUUID } from '../utils/index'
import { RssFeedAdd } from '../../wailsjs/go/main/App'

const Panel = Collapse.Panel

const App = () => {
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({
    isModalUpdate: false,
  })

  const itemsDropdown = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            setState({
              isModalUpdate: true,
            })
          }}
        >
          新增订阅源
        </div>
      ),
    },
    {
      key: '2',
      label: <div>新增文件夹</div>,
    },
  ]

  useEffect(() => {}, [])

  const onUpdateMenu = (type, data) => {
    const { menuList } = mUser
    if (type === 'add') {
      const sole = menuList.find((u) => u.key === '0')
      if (sole) {
        const soleChildren = sole.children.find((u) => u.key === data.url)
        if (soleChildren) {
          console.log('已添加')
        } else {
          sole.children.push({
            key: data.url,
            value: '知乎每日精选',
          })
        }
      }
    }
  }

  return (
    <>
      <div className='take'>
        <div>
          <Input placeholder='搜索' />
        </div>
        <div>
          <Dropdown menu={{ items: itemsDropdown }} placement='bottom' trigger={['click']}>
            <Button icon={<PlusOutlined />} />
          </Dropdown>
        </div>
      </div>

      <div className='tree-list'>
        <Collapse defaultActiveKey={['1']} onChange={() => {}}>
          {snapUser.menuList.map((u) => (
            <Panel key={u.key} header={u.value} extra={<EditOutlined />}>
              {u.children.map((h) => (
                <Button type='text' key={h.key} block>
                  {h.value}
                </Button>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
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
              if (res.code === 0) {
                onUpdateMenu('add', { res, url })
              }
            })

            setState({
              isModalUpdate: false,
            })
          }}
        />
      )}
    </>
  )
}
export default App
