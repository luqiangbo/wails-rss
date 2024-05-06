import { proxyWithPersist } from './index'

export const mUser = proxyWithPersist(
  {
    menuList: [
      {
        key: '0',
        value: '默认',
        children: [],
      },
    ],
    menuListChildren: [],
    menuListTitle: '',
  },
  {
    key: 'mUser',
  },
)
