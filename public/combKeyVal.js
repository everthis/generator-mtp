function combKeyVal(obj) {
  const arr = []
  for(let el in obj) {
    if (obj.hasOwnProperty(el)) {
      arr.push(`${el}@${obj[el]}`)
    }
  }
  return arr
}
module.exports = combKeyVal