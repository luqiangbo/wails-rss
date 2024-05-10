import { proxyWithPersist } from './index'
import dayjs from 'dayjs'

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
    viewObj: {}, // 观看
    collectList: [], // 收藏
  },
  {
    key: 'mUser',
  },
)

export const mUserActions = {
  onRssActive: (type) => {
    let res = {}
    if (type === 'all') {
      // 所以列表
    } else if (type === 'day') {
      // 今日更新
    } else if (type === 'collect') {
      // 收藏列表
    } else if (type === 'view') {
      // 未读列表
    } else {
      const sole = mUser.folderList.find((u) => u.key === mUser.activeFolder)
      if (sole) {
        const soleRss = sole.childrenObj[mUser.activeRss]
        if (soleRss) {
          res = soleRss
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
            const givenTime = dayjs(h.pub_date)
            const today = dayjs().startOf('day')
            const isSameDay = givenTime.isSame(today, 'day')
            if (isSameDay) {
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
