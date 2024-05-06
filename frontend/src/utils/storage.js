import localForage from 'localforage'

const storageInstance = localForage.createInstance({
  name: 'myApp', // 设置数据库名称
  driver: localForage.INDEXEDDB, // 指定使用 IndexedDB 作为驱动
  size: 100 * 1000 * 1000, // 设置缓存大小限制为  * MB
  storeName: 'myStore', // 设置对象存储名称
})

export const getItem = (key) => storageInstance.getItem(key)
export const setItem = (key, value) => storageInstance.setItem(key, value)
export const removeItem = (key) => storageInstance.removeItem(key)
export const clear = () => storageInstance.clear()
export const length = () => storageInstance.length()
export const iterate = (iteratorCallback) => storageInstance.iterate(iteratorCallback)
