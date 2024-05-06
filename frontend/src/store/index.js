import { proxy, subscribe, snapshot } from 'valtio'
import { devtools } from 'valtio/utils'
import { getItem, setItem } from '../utils/storage'

import { mUser } from './user'
import { mCommon } from './common'

const mState = proxy({ mUser, mCommon })

devtools(mState)

// 持久化函数
export function proxyWithPersist(val, opts) {
  const local = localStorage.getItem(opts.key)
  const state = proxy(local ? JSON.parse(local) : val)
  subscribe(state, () => {
    // 改变才会触发
    console.log('store')
    localStorage.setItem(opts.key, JSON.stringify(snapshot(state)))
  })
  return state
}

export { mState, mUser, mCommon }
