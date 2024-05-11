// the function from question-1
function min(arr) {
    let num = Math.min(...arr)
    return num;
}

function sort(arr) {
    let sortedArr = [],
      len = arr.length;
    for (i = 0; i < len; i++) {
      let minNum = min(arr),
        index = arr.indexOf(minNum);
      sortedArr.push(minNum);
      arr.splice(index, 1);
    }
    return sortedArr;
}