// exc 1

let fruits = ["apple", "banana", "mango"];

fruits.push("orange");
fruits.pop();
fruits.unshift("strawberry");
fruits.shift();
console.log(fruits[fruits.length - 1]);

// exc 2

const numbers = [1, 2, 3, 4, 5];

numbers.forEach((number, index) => {
  console.log(`fruit = ${number} index = ${index}`);
});

const double = numbers.map((number) => {
  return number * 2;
});

const even = numbers.filter((number) => {
  return number % 2 === 0;
});

const sum1 = numbers.reduce((acc, number) => {
  return acc + number;
}, 0);

// exc 3

const students = ["Omer", "Jane", "Biden", "Jill"];

const onlyJ = students.find((student) => {
  return student.includes("J");
});

const onlyJSome = students.some((student) => {
  return student.includes("J");
});

const onlyJEvery = students.every((student) => {
  return student.includes("J");
});

// exc 4

const colors = ["red", "blue", "green", "yellow", "purple"];

const newColors = colors.slice(0, 3);

colors.splice(3, 2, "pink", "orange");

// exc 5

const products = [
  { name: "laptop", price: 1000 },
  { name: "phone", price: 500 },
  { name: "tablet", price: 800 },
  { name: "watch", price: 200 },
];

const productNames = products.map((product) => {
  return product.name;
});

const moreThan00 = products.filter((product) => {
  return product.price > 500;
});

const sum = products.reduce((acc, product) => {
  return acc + product.price;
}, 0);

// Challenge 1

const inventory = [
  { id: 1, name: "Laptop", price: 1000 },
  { id: 2, name: "Phone", price: 500 },
  { id: 3, name: "Tablet", price: 800 },
];

function arrayToObject(array, key) {
  return array.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {});
}

// Challenge 4

const array1 = [1, 2, 3, 4, 5];
const array2 = [3, 4, 5, 6, 7];

function intersectArrays(array1, array2) {
  return array1.filter((item) => {
    return array2.includes(item);
  });
}

// Challenge 5

const duplicates = [1, 2, 2, 3, 4, 4, 5];

function uniqueValues(array) {
  return array.reduce((acc, item) => {
    if (!acc.includes(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
}

// Challenge 6

const employees = [
  { name: "John Doe", department: "Engineering", yearsOfExp: 5 },
  { name: "Jane Smith", department: "Marketing", yearsOfExp: 8 },
  { name: "Peter Johnson", department: "Engineering", yearsOfExp: 5 },
  { name: "Lucy Brown", department: "Marketing", yearsOfExp: 10 },
  { name: "Mike Davis", department: "Engineering", yearsOfExp: 3 },
  { name: "Sara Wilson", department: "Marketing", yearsOfExp: 8 },
];

function groupBy(array, key) {
  return array.reduce((acc, item) => {
    if (!acc[item[key]]) {
      acc[item[key]] = [];
    }
    acc[item[key]].push(item);
    return acc;
  }, {});
}
