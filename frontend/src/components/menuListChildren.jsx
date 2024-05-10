import React, { useEffect } from 'react'
import { Collapse, Affix, Avatar, Badge } from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Scrollbars } from 'rc-scrollbars'

import { stringToColour } from '../utils/index'
import { dbGetItem } from '../utils/storage'
import { mCommon, mUser, mUserActions } from '../store'
import _ from '../utils/lodash'

const Panel = Collapse.Panel

const App = () => {
  const snapCommon = useSnapshot(mCommon)
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  return (
    <div className='menu-list-children'>
      <Affix offsetTop={50}>
        <Scrollbars style={{ height: 'calc(100vh - 50px)' }}>
          <div className='menu-tree-detail'>
            {_.get(mUserActions.onRssActive(), 'children', []).map((u) => (
              <Badge dot={_.get(snapUser.viewObj, u.id, 0) === 0} key={u.id}>
                <div
                  className='menu-tree-detail-item'
                  key={u.id}
                  onClick={async () => {
                    mUser.viewObj[u.id] = _.get(mUser.viewObj, u.id, 0) + 1
                    const sole = await dbGetItem(u.id)
                    if (sole) {
                      window.scrollTo(0, 0)
                      mCommon.htmlString = sole.description
                    }
                  }}
                >
                  <div className='title'>{u.title}</div>
                  <div className='intro'>{u.intro}</div>
                  <div className='bottom'>
                    <div className='left'>
                      <Avatar
                        style={{
                          verticalAlign: 'middle',
                          backgroundColor: stringToColour(u.parent.id),
                        }}
                        size={25}
                      >
                        {u.parent.title[0]}
                      </Avatar>
                    </div>
                    <div className='right'>
                      <div>
                        <EyeOutlined style={{ fontSize: '12px', color: '#aaa', margin: '0 3px' }} />
                        {_.get(snapUser.viewObj, u.id, 0)}
                      </div>
                      <div>{u.pub_date}</div>
                    </div>
                  </div>
                </div>
              </Badge>
            ))}
          </div>
        </Scrollbars>
      </Affix>
    </div>
  )
}
export default App
