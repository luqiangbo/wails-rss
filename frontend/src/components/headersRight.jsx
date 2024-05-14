import React, { useEffect } from 'react'
import { useSetState } from 'ahooks'
import { useSnapshot } from 'valtio'
import { Rate, Segmented } from 'antd'

import { mUser, mCommon } from '../store'

const App = () => {
  const snapUser = useSnapshot(mUser)
  const snapCommon = useSnapshot(mCommon)
  const [state, setState] = useSetState({})
  useEffect(() => {}, [])

  return (
    <div className='header-3'>
      <div className='collect'>
        {snapCommon.htmlString ? (
          <Rate
            count={1}
            value={snapUser.collectList.includes(mCommon.htmlId) ? 1 : 0}
            onChange={(e) => {
              if (e) {
                mUser.collectList.push(mCommon.htmlId)
              } else {
                mUser.collectList = mUser.collectList.filter((u) => u !== mCommon.htmlId)
              }
            }}
          />
        ) : null}
      </div>
      <div>
        <Segmented
          options={[
            {
              label: '原文',
              value: '0',
            },
            {
              label: '原文(宽屏)',
              value: '1',
            },
            {
              label: '网页',
              value: '2',
            },
          ]}
          value={snapCommon.radioHtmlShow}
          onChange={(value) => {
            mCommon.radioHtmlShow = value
          }}
        />
      </div>
    </div>
  )
}

function Hit(props) {
  return (
    <div>
      <img src={props.hit.image} align='left' alt={props.hit.name} />
      <div className='hit-name'>
        <Highlight attribute='name' hit={props.hit} />
      </div>
      <div className='hit-description'>
        <Highlight attribute='description' hit={props.hit} />
      </div>
      <div className='hit-price'>${props.hit.price}</div>
    </div>
  )
}

export default App
