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
    menuListChildren: [],
    menuListTitle: '',
    onRssTitle: () => {
      let res = ''
      const sole = mUser.folderList.find((u) => u.key === activeFolder)
      if (sole) {
        const soleRss = sole.childrenObj[activeRss]
        if (soleRss) {
          res = soleRss.title
        }
      }
      return res
    },
    onMenuListChildren() {
      mUser
    },
  },
  {
    key: 'mUser',
  },
)
