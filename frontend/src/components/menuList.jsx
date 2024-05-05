import React, { useEffect } from 'react'
import { Collapse, Input, Button, Dropdown, Avatar, Badge, Tooltip } from 'antd'
import { EditOutlined, PlusOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import { mUser, mCommon } from '../store'
import ModalUpdate from './modalUpdate'
import { generateUUID, stringToColour } from '../utils/index'
import { RssFeedAdd } from '../../wailsjs/go/main/App'

const Panel = Collapse.Panel

const App = () => {
  const snapUser = useSnapshot(mUser)
  const snapCommon = useSnapshot(mCommon)
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

    const { title, items } = data.res.data || {}

    if (type === 'add') {
      const sole = menuList.find((u) => u.key === '0')
      if (sole) {
        const soleChildren = sole.children.find((u) => u.key === data.url)
        if (soleChildren) {
          console.log('已添加')
        } else {
          let list = []
          let showHtml = {}
          items.map((u) => {
            list.push({
              title: u.title,
              link: u.link,
              pub_date: u.pub_date,
              view: 0,
              collect: false,
              parent: title,
            })
            mUser.descriptionObj[u.link] = u.description
          })

          sole.children.push({
            key: data.url,
            value: title,
            children: list,
          })
          mUser.menuListChildren = list
          mUser.menuListTitle = title
        }
      }
    }
    if (type === 'show') {
      let list = []
      items.map((u) => {
        list.push({
          title: u.title,
          link: u.link,
          pub_date: u.pub_date,
          view: 0,
          collect: false,
          parent: title,
        })
        mUser.descriptionObj[u.link] = u.description
      })
      mUser.menuListChildren = list
      mUser.menuListTitle = title
    }
  }

  const fetchList = (type, url) => {
    mCommon.spinning = true
    RssFeedAdd(url).then((res) => {
      mCommon.spinning = false
      console.log({ res })
      if (res.code === 0) {
        onUpdateMenu(type, { res, url })
      }
    })
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

      <div className='menu-list'>
        <Collapse defaultActiveKey={['1']} onChange={() => {}}>
          {snapUser.menuList.map((u) => (
            <Panel key={u.key} header={u.value} extra={<EditOutlined />}>
              {u.children.map((h) => (
                <dev className='menu-list-item' key={h.key}>
                  <div
                    className='menu-list-item-left'
                    onClick={() => {
                      fetchList('show', h.key)
                    }}
                  >
                    <Badge count={1}>
                      <Avatar
                        style={{
                          verticalAlign: 'middle',
                          backgroundColor: stringToColour(h.value),
                        }}
                        size={30}
                        gap={2}
                      >
                        {h.value[0]}
                      </Avatar>
                    </Badge>
                    <div className='menu-list-item-left-value'>{h.value}</div>
                  </div>
                  <div className='menu-list-item-right'>
                    <Tooltip title='更新'>
                      <Button shape='circle' icon={<RedoOutlined />} />
                    </Tooltip>
                    <Tooltip title='删除'>
                      <Button danger shape='circle' icon={<DeleteOutlined />} />
                    </Tooltip>
                  </div>
                </dev>
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
            fetchList('add', url)
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
