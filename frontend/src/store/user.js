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
    menuListChildren: [],
    menuListTitle: '',
  },
  {
    key: 'mUser',
  },
)
