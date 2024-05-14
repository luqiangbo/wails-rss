import { proxyWithPersist } from './index'
import { isSameDay } from '../utils/index'

export const mUser = proxyWithPersist(
  {
    folderList: [
      {
        key: '0',
        value: '默认',
        childrenObj: {},
      },
    ],
    activeFolder: '',
    activeRss: '',
    activeFast: -1,
    activeTitle: '',
    viewObj: {}, // 观看
    collectList: [], // 收藏
    outlined: 'sun', // sun moon
  },
  {
    key: 'mUser',
  },
)

export const mUserActions = {
  onRssActive: () => {
    let res = []
    console.log('onRssActive', { activeFast: mUser.activeFast })
    if (mUser.activeFast === 0) {
      // 所有列表
      let title = '所有列表'
      let children = []
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          children = [...children, ...value.children]
        })
      })
      res = children
    } else if (mUser.activeFast === 1) {
      // 今日更新
      let title = '今日更新'
      let children = []
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          value.children.forEach((h) => {
            if (isSameDay(h.pub_date)) {
              children.push(h)
            }
          })
        })
      })
      res = children
    } else if (mUser.activeFast === 2) {
      // 收藏列表
      let title = '收藏列表'
      let children = []
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          value.children.forEach((h) => {
            if (mUser.collectList.includes(h.id)) {
              children.push(h)
            }
          })
        })
      })
      res = children
    } else if (mUser.activeFast === 3) {
      // 未读列表
      let title = '未读列表'
      let children = []
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          value.children.forEach((h) => {
            if (!mUser.viewObj[h.id]) {
              children.push(h)
            }
          })
        })
      })
      res = children
    } else {
      const sole = mUser.folderList.find((u) => u.key === mUser.activeFolder)
      if (sole) {
        const soleRss = sole.childrenObj[mUser.activeRss]
        if (soleRss) {
          res = soleRss.children
        }
      }
    }

    return res
  },
  onViewLength: (folderKey, rssId) => {
    const sole = mUser.folderList.find((u) => u.key === folderKey)
    const soleRss = sole.childrenObj[rssId]
    const list = soleRss.children.filter(({ id }) => !mUser.viewObj[id])
    return list.length
  },
  onViewTypeLength: (type) => {
    let res = 0
    if (type === 0) {
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          res = res + value.children.length
        })
      })
    }
    if (type === 1) {
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          value.children.forEach((h) => {
            if (isSameDay(h.pub_date)) {
              res = res + 1
            }
          })
        })
      })
    }
    if (type === 2) {
      res = mUser.collectList.length
    }
    if (type === 3) {
      let good = 0
      mUser.folderList.forEach((u) => {
        Object.entries(u.childrenObj).forEach(([key, value]) => {
          good = good + value.children.length
        })
      })
      res = good - Object.keys(mUser.viewObj).length
    }
    return res
  },
}
