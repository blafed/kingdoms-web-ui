export function randomId() {
  //create random string id from 8 characters
  return Math.random().toString(36).substr(2, 8)
}
