import { proxyWithPersist } from './index'

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
    return soleRss.children.filter(({ view }) => view === 0).length
  },
}
