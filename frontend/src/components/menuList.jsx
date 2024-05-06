import React, { useEffect } from 'react'
import { Collapse, Input, Button, Dropdown, Avatar, Badge, Affix, Divider, message } from 'antd'
import {
  EditOutlined,
  PlusOutlined,
  SettingOutlined,
  GithubOutlined,
  WechatOutlined,
  MailOutlined,
} from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'

import { mUser, mCommon } from '../store'
import ModalUpdate from './modalUpdate'
import { extractFirstNChars, stringToColour } from '../utils/index'
import { setItem } from '../utils/storage'
import { RssFeedAdd } from '../../wailsjs/go/main/App'

const Panel = Collapse.Panel

const App = () => {
  const snapUser = useSnapshot(mUser)
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    isModalUpdate: false,
    isShowSetting: false,
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
          新建订阅源
        </div>
      ),
    },
    {
      key: '2',
      label: <div>新建文件夹</div>,
    },
  ]

  const settingDropdown = [
    {
      key: '1',
      label: <div onClick={() => {}}>编辑</div>,
    },
    {
      key: '2',
      label: <div>删除</div>,
    },
  ]

  useEffect(() => {}, [])

  const onUpdateMenu = (type, data) => {
    const { menuList } = mUser
    console.log(data.res)
    const { title, items } = data.res.data || []
    if (type === 'add') {
      const sole = menuList.find((u) => u.key === '0')
      if (sole) {
        const soleChildren = sole.children.find((u) => u.key === data.url)
        if (soleChildren) {
          console.log('已添加')
        } else {
          let list = []
          items.map((u) => {
            list.push({
              id: u.id,
              title: u.title,
              link: u.link,
              pub_date: u.pub_date,
              view: 0,
              collect: false,
              parent: title,
              intro: extractFirstNChars(u.description, 50),
            })
            setItem(u.id, u)
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
          id: u.id,
          title: u.title,
          link: u.link,
          pub_date: u.pub_date,
          view: 0,
          collect: false,
          parent: title,
          intro: extractFirstNChars(u.description, 50),
        })
        setItem(u.id, u)
      })
      mUser.menuListChildren = list
      mUser.menuListTitle = title
    }
  }

  const fetchList = (type, rssList) => {
    mCommon.spinning = true
    console.log({ type, rssList })
    RssFeedAdd(rssList).then((res) => {
      mCommon.spinning = false
      if (res.code === 0) {
        onUpdateMenu(type, { res })
      }
      if (res.code === 1) {
        message.warning('失败')
      }
    })
  }

  return (
    <Affix offsetTop={50}>
      <div className='menu'>
        <div className='fast-list'>
          {state.fastList.map((u) => (
            <Button block key={u.key} size='middle' className='my-1'>
              {u.value}
            </Button>
          ))}
        </div>
        <Divider>订阅源</Divider>
        <div className='take'>
          <div className='left'>
            <Input placeholder='搜索' />
          </div>
          <div>
            <Dropdown menu={{ items: itemsDropdown }} placement='bottom' trigger={['click']}>
              <Button icon={<PlusOutlined />} />
            </Dropdown>
            <Button
              type={state.isShowSetting ? 'primary' : 'default'}
              icon={<SettingOutlined />}
              onClick={() => {
                setState({
                  isShowSetting: !state.isShowSetting,
                })
              }}
            />
          </div>
        </div>

        <div className='menu-list'>
          <Collapse defaultActiveKey={['0']} onChange={() => {}}>
            {snapUser.menuList.map((u) => (
              <Panel key={u.key} header={u.value} extra={state.isShowSetting ? <EditOutlined /> : ''}>
                {u.children.map((h) => (
                  <dev className='menu-list-item' key={h.key}>
                    <div
                      className='menu-list-item-left'
                      onClick={() => {
                        fetchList('show', h.key)
                      }}
                    >
                      <Badge count={1} size='small'>
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
                      {state.isShowSetting ? (
                        <Dropdown menu={{ items: settingDropdown }} placement='bottom' trigger={['click']}>
                          <Button icon={<SettingOutlined />} type='text' />
                        </Dropdown>
                      ) : (
                        ''
                      )}
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
        <div className='config'>
          <Button type='dashed' icon={<GithubOutlined />}></Button>
          <Button type='dashed' icon={<WechatOutlined />}></Button>
          <Button type='dashed' icon={<MailOutlined />}></Button>
        </div>
      </div>
    </Affix>
  )
}
export default App
