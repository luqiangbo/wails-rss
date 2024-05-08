import AV from 'leancloud-storage'

AV.init({
  appId: 'wqKcNyvRFMq41elaR4HooqMV-gzGzoHsz',
  appKey: 'izmT6QaJzgpLdun7fX5HJwKG',
  serverURL: 'https://leancloud.cooog.com',
})

const tableName = 't_rss'

export function generateUUID() {
  let time = new Date().getTime()
  let rand = Math.random() * 16
  return btoa(`${time}-${rand}`).replace(/[+/]/g, '').slice(0, 22)
}

export function stringToColour(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let colour = '#'
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff
    colour += ('00' + value.toString(16)).substr(-2)
  }
  return colour
}

export function extractFirstNChars(html, n) {
  const regex = />(.+?)</s // 单行模式
  const match = html.match(regex)
  if (match) {
    const text = match[1]
    return text.slice(0, n) + '...'
  }
  return ''
}

export function leancloudAdd(data, callback) {
  // 声明 class
  const tableObj = AV.Object.extend(tableName)
  // 构建对象
  const todo = new tableObj()
  // 为属性赋值
  Object.entries(data).map(([key, value]) => {
    todo.set(key, value)
  })
  todo.save().then(
    (res) => callback('保存成功。'),
    (err) => callback('保存失败。'),
  )
}

export function leancloudFindId(id, callback) {
  const query = new AV.Query(tableName)
  query.get(id).then((todo) => callback(todo.toJSON()))
}

export function leancloudUpdateId(id, data, callback) {
  const todo = AV.Object.createWithoutData(tableName, id)
  Object.entries(data).map(([key, value]) => {
    todo.set(key, value)
  })
  todo.save().then(
    (res) => callback('保存成功。'),
    (err) => callback('保存失败。'),
  )
}

export function leancloudDeleteId(id, callback) {
  const todo = AV.Object.createWithoutData(tableName, id)
  todo.destroy()
}

export function leancloudFindEqual(key, value, callback) {
  const query = new AV.Query(tableName)
  query.equalTo(key, value)
  query.find().then((students) => {
    callback(students)
  })
}
