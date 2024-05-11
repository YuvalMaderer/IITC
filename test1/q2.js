function maxAndIndex(arr) {
    let num = Math.max(...arr)
    let index = arr.indexOf(num)
    return [num, index]
  }