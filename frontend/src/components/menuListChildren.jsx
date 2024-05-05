import React, { useEffect } from 'react'
import { Collapse, Affix, Avatar } from 'antd'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Scrollbars } from 'rc-scrollbars'

import { stringToColour } from '../utils/index'
import { mCommon, mUser } from '../store'
import { calc } from 'antd/es/theme/internal'

const Panel = Collapse.Panel

const App = () => {
  const snapCommon = useSnapshot(mCommon)
  const snapUser = useSnapshot(mUser)
  const [state, setState] = useSetState({})

  useEffect(() => {}, [])

  return (
    <>
      <Affix offsetTop={50}>
        <Scrollbars style={{ height: 'calc(100vh - 50px)' }}>
          <div className='menu-tree-detail'>
            {snapUser.menuListChildren.map((u) => (
              <div
                className='menu-tree-detail-item'
                key={u.link}
                onClick={() => {
                  const sole = mUser.descriptionObj[u.link]
                  console.log({ sole })
                  if (sole) {
                    window.scrollTo(0, 0)
                    mCommon.htmlString = sole
                  }
                }}
              >
                <div className='title'>{u.title}</div>
                <div className='bottom'>
                  <div className='left'>
                    <Avatar
                      style={{
                        verticalAlign: 'middle',
                        backgroundColor: stringToColour(u.parent),
                      }}
                      size={25}
                    >
                      {u.parent[0]}
                    </Avatar>
                  </div>
                  <div className='right'>{u.pub_date}</div>
                </div>
              </div>
            ))}
          </div>
        </Scrollbars>
      </Affix>
    </>
  )
}
export default App
