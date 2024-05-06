import React, { useEffect } from 'react'
import { Collapse, Affix, Avatar } from 'antd'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Scrollbars } from 'rc-scrollbars'

import { stringToColour } from '../utils/index'
import { getItem } from '../utils/storage'
import { mCommon, mUser } from '../store'
import { calc } from 'antd/es/theme/internal'

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
            {snapUser.menuListChildren.map((u) => (
              <div
                className='menu-tree-detail-item'
                key={u.id}
                onClick={async () => {
                  const sole = await getItem(u.id)
                  console.log({ sole, u })
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
                  <div className='right'>{u.pub_date}</div>
                </div>
              </div>
            ))}
          </div>
        </Scrollbars>
      </Affix>
    </div>
  )
}
export default App
