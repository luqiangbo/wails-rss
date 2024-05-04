export function generateUUID() {
  let time = new Date().getTime()
  let rand = Math.random() * 16
  return btoa(`${time}-${rand}`).replace(/[+/]/g, '').slice(0, 22)
}
