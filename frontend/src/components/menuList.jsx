import React, { useEffect } from 'react'
import { Collapse, Input, Button, Dropdown, Avatar, Divider, message, Tag } from 'antd'
import {
  PlusOutlined,
  SettingOutlined,
  GithubOutlined,
  RedoOutlined,
  EllipsisOutlined,
  SunOutlined,
  MoonOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Scrollbars } from 'rc-scrollbars'

import { mUser, mCommon, mUserActions } from '../store'
import ModalUpdate from './modalUpdate'
import ModalFolder from './modalFolder'
import ModalRss from './modalRss'
import ModalSetting from './modalSetting'
import { dbSetItem } from '../utils/storage'
import { extractFirstNChars, stringToColour } from '../utils/index'
import _ from '../utils/lodash'
import { RssFeedAdd } from '../../wailsjs/go/main/App'
import { BrowserOpenURL } from '../../wailsjs/runtime/runtime'
import classNames from 'classnames'

const Panel = Collapse.Panel

const App = () => {
  const snapUser = useSnapshot(mUser)
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({
    isModalUpdate: false,
    isShowSetting: false,
    isModalFolder: false,
    isModalRss: false,
    isModalSetting: false,
    fastList: [
      {
        key: 0,
        value: '所有列表',
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
      label: (
        <div
          onClick={() => {
            setState({ isModalFolder: true })
            mCommon.modalFolderType = 'add'
          }}
        >
          新建文件夹
        </div>
      ),
    },
  ]

  const settingDropdown = [
    {
      key: '1',
      label: (
        <div
          onClick={() => {
            setState({
              isModalRss: true,
            })
          }}
        >
          编辑
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div
          onClick={() => {
            const { dropdownRssId, dropdownFolderId } = mCommon
            const sole = _.find(mUser.folderList, { key: dropdownFolderId })
            if (sole) {
              sole.childrenObj[dropdownRssId].children.forEach((u) => {
                delete mUser.viewObj[u.id]
                mUser.collectList = mUser.collectList.filter((h) => h !== u.id)
              })
              delete sole.childrenObj[dropdownRssId]
            }
          }}
        >
          删除
        </div>
      ),
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
          parent: {
            id: u.id,
            link: u.link,
            title: u.title,
          },
          folder: folderSole.key,
          intro: extractFirstNChars(d.description, 50),
        })
        dbSetItem(d.id, d)
      })

      folderSole.childrenObj[u.id] = {
        id: u.id,
        title: u.title,
        link: u.link,
        children: list,
        show: true,
      }
    })
  }

  const fetchList = (rssList) => {
    mCommon.spinning = true
    setTimeout(() => {
      if (mCommon.spinning) {
        mCommon.spinning = false
      }
    }, 30 * 1000)
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

  const onUpdateAll = () => {
    let list = []
    mUser.folderList.forEach((u) => {
      Object.entries(u.childrenObj).map(([key, value]) => {
        list.push(value.link)
      })
    })
    const rssListString = list.join(',')
    fetchList(rssListString)
  }

  return (
    <div className='menu'>
      <div className='fast-list'>
        {state.fastList.map((u) => (
          <Button
            block
            key={u.key}
            size='middle'
            className='my-1 flex justify-between'
            type={snapUser.activeFast === u.key ? '' : 'text'}
            onClick={() => {
              mUser.activeTitle = u.value
              mUser.activeFast = u.key
            }}
          >
            <div>{u.value}</div>
            <Tag color='volcano' bordered={false}>
              {mUserActions.onViewTypeLength(u.key)}
            </Tag>
          </Button>
        ))}
      </div>
      <Divider>订阅源</Divider>
      <div className='take'>
        <div className='left'>
          <Input
            placeholder='搜索'
            onChange={(e) => {
              const value = e.target.value
              const folderList = mUser.folderList
              const folderTrim = []
              folderList.forEach((v) => {
                let childrenObj = {}
                Object.entries(v.childrenObj).forEach(([objKey, objValue]) => {
                  if (
                    objValue.title.toLowerCase().includes(value.toLowerCase()) ||
                    objValue.link.toLowerCase().includes(value.toLowerCase())
                  ) {
                    childrenObj[objKey] = { ...objValue, show: true }
                  } else {
                    childrenObj[objKey] = { ...objValue, show: false }
                  }
                })
                folderTrim.push({
                  ...v,
                  childrenObj,
                })
              })
              mUser.folderList = folderTrim
            }}
          />
        </div>
        <div>
          <Dropdown menu={{ items: itemsDropdown }} placement='bottom' trigger={['click']}>
            <Button icon={<PlusOutlined />} />
          </Dropdown>
          <Button
            type={state.isShowSetting ? 'primary' : 'default'}
            icon={<EditOutlined />}
            onClick={() => {
              setState({
                isShowSetting: !state.isShowSetting,
              })
            }}
          />
          <Button icon={<RedoOutlined />} onClick={onUpdateAll} />
        </div>
      </div>
      <Scrollbars style={{ height: '100%' }}>
        <div className='menu-list'>
          <Collapse defaultActiveKey={['0']} bordered={false}>
            {snapUser.folderList.map((u) => (
              <Panel
                key={u.key}
                header={u.value}
                extra={
                  state.isShowSetting ? (
                    <EditOutlined
                      onClick={() => {
                        setState({ isModalFolder: true })
                        mCommon.modalFolderType = 'edit'
                        mCommon.modalFolderKey = u.key
                        mCommon.modalFolderValue = u.value
                      }}
                    />
                  ) : (
                    ''
                  )
                }
              >
                {Object.entries(u.childrenObj).map(([key, value]) => (
                  <dev
                    className={classNames('menu-list-item', {
                      hide: !value.show,
                    })}
                    key={key}
                  >
                    <div
                      className='menu-list-item-left'
                      onClick={() => {
                        mUser.activeFast = -1
                        mUser.activeTitle = value.title
                        mUser.activeFolder = u.key
                        mUser.activeRss = key
                      }}
                    >
                      <Avatar
                        style={{
                          flex: '0 0 30px',
                          verticalAlign: 'middle',
                          backgroundColor: stringToColour(value.id),
                        }}
                        size={30}
                        gap={2}
                      >
                        {value.title[0]}
                      </Avatar>
                      <div className='menu-list-item-left-value'>{value.title}</div>
                    </div>
                    <div className='menu-list-item-right'>
                      {state.isShowSetting ? (
                        <Dropdown
                          menu={{ items: settingDropdown }}
                          placement='bottom'
                          trigger={['click']}
                          onOpenChange={(e) => {
                            if (e) {
                              mCommon.dropdownRssId = key
                              mCommon.dropdownFolderId = u.key
                            }
                          }}
                        >
                          <Button icon={<EllipsisOutlined />} type='text' />
                        </Dropdown>
                      ) : (
                        <div>
                          <Tag color='volcano' bordered={false}>
                            {mUserActions.onViewLength(u.key, key)}
                          </Tag>
                        </div>
                      )}
                    </div>
                  </dev>
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
      </Scrollbars>
      <div className='config'>
        <Button
          type='text'
          icon={<GithubOutlined />}
          onClick={() => {
            BrowserOpenURL('https://github.com/luqiangbo/wails-rss')
          }}
        ></Button>
        <Button
          type='text'
          icon={snapUser.theme === 'dark' ? <MoonOutlined /> : <SunOutlined />}
          onClick={() => {
            const _theme = mUser.theme === 'dark' ? 'light' : 'dark'
            mUser.theme = _theme
            document.documentElement.setAttribute('data-theme', _theme)
          }}
        ></Button>
        <Button
          type='text'
          icon={<SettingOutlined />}
          onClick={() => {
            setState({
              isModalSetting: true,
            })
          }}
        ></Button>
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

      {state.isModalFolder && (
        <ModalFolder
          onCancel={() => {
            setState({
              isModalFolder: false,
            })
          }}
          onOk={() => {
            setState({
              isModalFolder: false,
            })
          }}
        />
      )}
      {state.isModalRss && (
        <ModalRss
          onCancel={() => {
            setState({
              isModalRss: false,
            })
          }}
          onOk={() => {
            setState({
              isModalRss: false,
            })
          }}
        />
      )}
      {state.isModalSetting && (
        <ModalSetting
          onCancel={() => {
            setState({
              isModalSetting: false,
            })
          }}
          onOk={() => {
            setState({
              isModalSetting: false,
            })
          }}
        />
      )}
    </div>
  )
}
export default App
