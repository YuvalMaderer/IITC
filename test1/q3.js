function findSum(arr) {
    let sum = 0
    for (let i of arr) {
      for (let j of i) {
        sum += j
      }
    }
    return sum
  }