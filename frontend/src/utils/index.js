import dayjs from 'dayjs'

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

export function isSameDay(time) {
  const givenTime = dayjs(time)
  const today = dayjs().startOf('day')
  return givenTime.isSame(today, 'day')
}
