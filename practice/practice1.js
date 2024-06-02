const cat = {
    nickname: 'Fluffy',
    age: 1
}

function incrementedAge(cat) {
    const newCat = {...cat}
    newCat.age++
    return newCat
}

const newCat = incrementedAge(cat)