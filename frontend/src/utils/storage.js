import localForage from 'localforage'

const storageInstance = localForage.createInstance({
  name: 'myApp', // 设置数据库名称
  driver: localForage.INDEXEDDB, // 指定使用 IndexedDB 作为驱动
  size: 100 * 1000 * 1000, // 设置缓存大小限制为  * MB
  storeName: 'myStore', // 设置对象存储名称
})

export const dbGetItem = (key) => storageInstance.getItem(key)
export const dbSetItem = (key, value) => storageInstance.setItem(key, value)
export const dbRemoveItem = (key) => storageInstance.removeItem(key)
export const dbClear = () => storageInstance.clear()
export const dbLength = () => storageInstance.length()
export const dbIterate = (iteratorCallback) => storageInstance.iterate(iteratorCallback)
