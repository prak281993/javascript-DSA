// truncate string greater than provided number
function truncateString(str, num) {
  if (str.length > num) return str.substring(0, num) + "...";
  return str;
}

function findElement(arr, func) {
  let num = 0;
  num = arr.find(func);
  return num;
}
findElement([1, 2, 3, 4], (num) => num % 2 === 0);

// returns
function booWho(bool) {
  return typeof bool === "boolean";
}

// capitalize first character of every string
function titleCase(str) {
  str = str.toLowerCase();
  str = str
    .split(" ")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
  console.log(str);
  return str;
}

// Copy each element of the first array into the second array, in order.
function frankenSplice(arr1, arr2, n) {
  const arr = [...arr2];
  arr.splice(n, 0, ...arr1);
  return arr;
}

frankenSplice([1, 2, 3], [4, 5, 6], 1);

// remove falsy values from array
function bouncer(arr) {
  return arr.filter((item) => item);
}

// split array by removing all special characters
function splitify(str) {
  str = str.replace(/[^a-zA-Z0-9]/g, " ");
  return str.split(" ");
}

// creating string by splitting based on special character and joining using space
function sentensify(str) {
  return str.split(/[.\-_,]/).join(" ");
}

// Return the lowest index at which a value (second argument) should be inserted into an array (first argument) once it has been sorted
function getIndexToIns(arr, num) {
  arr.push(num);
  arr.sort((a, b) => a - b);
  return arr.findIndex((item) => item === num);
}

//Return true if the string in the first element of the array
//contains all of the letters of the string in the second element of the array.
function mutation(arr) {
  const arr1 = arr[0].toLowerCase().split("");
  const arr2 = arr[1].toLowerCase().split("");
  return arr2.every((item) => arr1.includes(item));
}

function chunkArrayInGroups(arr, size) {
  const newArr = arr.reduce((acc, item, index) => {
    let subArr;
    if (acc.length === 0 || index % size === 0) {
      subArr = [];
    } else {
      subArr = acc.pop();
    }
    subArr.push(item);
    acc.push(subArr);
    return acc;
  }, []);
  console.log(newArr);
  return newArr;
}

chunkArrayInGroups(["a", "b", "c", "d"], 2);

// Custom map
let s = [23, 65, 98, 5];

Array.prototype.myMap = function (callback) {
  let newArray = [];
  for (let i = 0; i < this.length; i++) {
    newArray.push(callback(this[i]));
  }
  return newArray;
};

let new_s = s.myMap(function (item) {
  return item * 2;
});

// Custom array filter
Array.prototype.myFilter = function (callback) {
  var newArray = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i])) {
      newArray.push(this[i]);
    }
  }
  return newArray;
};

let filteredArray = s.myFilter(function (item) {
  return item % 2 === 1;
});

// convert binary to decimal using parseInt(string,radix)
function convertToInteger(str) {
  return parseInt(str, 2);
}

convertToInteger("10011");
