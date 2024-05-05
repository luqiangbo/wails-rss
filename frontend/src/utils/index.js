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
