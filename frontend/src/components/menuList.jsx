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

  const onUpdateMenu = (data) => {
    const { folderList } = mUser
    console.log(data.res)
    const rssList = data.res.data || []
    rssList.forEach((u) => {
      let folderSole = folderList.find((h) => h.childrenObj[u.id])
      if (!folderSole) {
        folderSole = folderList.find((h) => h.key === '0')
      }
      console.log({ folderSole })
      let list = []
      u.items.map((d) => {
        list.push({
          id: d.id,
          title: d.title,
          link: d.link,
          pub_date: d.pub_date,
          view: 0,
          collect: false,
          parent: {
            id: u.id,
            link: u.link,
            title: u.title,
          },
          folder: folderSole.key,
          intro: extractFirstNChars(d.description, 50),
        })
        setItem(d.id, d)
      })

      folderSole.childrenObj[u.id] = {
        id: u.id,
        title: u.title,
        link: u.link,
        children: list,
      }
      mUser.menuListChildren = list
      mUser.menuListTitle = u.title
    })
  }

  const fetchList = (rssList) => {
    mCommon.spinning = true
    console.log({ rssList })
    RssFeedAdd(rssList).then((res) => {
      mCommon.spinning = false
      if (res.code === 0) {
        onUpdateMenu({ res })
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
          <Collapse defaultActiveKey={['0']}>
            {snapUser.folderList.map((u) => (
              <Panel key={u.key} header={u.value} extra={state.isShowSetting ? <EditOutlined /> : ''}>
                {Object.entries(u.childrenObj).map(([key, value]) => (
                  <dev className='menu-list-item' key={key}>
                    <div
                      className='menu-list-item-left'
                      onClick={() => {
                        mUser.menuListChildren = value.children
                        mUser.activeFolder = u.key
                        mUser.activeRss = key
                      }}
                    >
                      <Badge count={1} size='small'>
                        <Avatar
                          style={{
                            verticalAlign: 'middle',
                            backgroundColor: stringToColour(value.id),
                          }}
                          size={30}
                          gap={2}
                        >
                          {value.title[0]}
                        </Avatar>
                      </Badge>
                      <div className='menu-list-item-left-value'>{value.title}</div>
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
              fetchList(url)
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
