// sum of all values between a range
function sumAll(arr) {
  arr.sort((a, b) => a - b);
  const start = arr[0];
  const end = arr[1];
  const diff = end - start;
  const newArr = Array.from(Array(diff + 1), (x, i) => i + start);
  return newArr.reduce((acc, item) => acc + item, 0);
}

sumAll([1, 4]);

// difference between two arrays
function diffArray(arr1, arr2) {
  const firstFilter = arr1.filter((item) => !arr2.includes(item));
  const secondFilter = arr2.filter((item) => !arr1.includes(item));
  return [...firstFilter, ...secondFilter];
}

// Remove all elements from the initial array that are of the same value as these arguments.
function destroyer(arr) {
  const toRemove = [...arguments].filter((x, i) => i !== 0);
  return arr.filter((item) => !toRemove.includes(item));
}
const result = destroyer([1, 2, 3, 1, 2, 3], 2, 3);

// Make a function that looks through an array of objects (first argument)
// and returns an array of all objects that have matching name
//and value pairs (second argument).
// Each name and value pair of the source object has to be present in the object from the collection
// if it is to be included in the returned array.
function whatIsInANameSolution1(collection, source) {
  var arr = [];
  const sourceKeys = Object.keys(source);
  for (let item of collection) {
    let f = 0;
    for (let key of sourceKeys) {
      if (source[key] !== item[key]) {
        f = 1;
        break;
      }
    }
    if (f == 0) arr.push(item);
  }
  return arr;
}

function whatIsInAName(collection, source) {
  let sourceKeys = Object.keys(source);
  return collection.filter((item) => {
    return sourceKeys.every(
      (key) => item.hasOwnProperty(key) && item[key] === source[key]
    );
  });
}

function spinalCase(str) {
  let regex = /([a-z])([A-Z])/g;
  str = str
    .replace(regex, "$1 $2")
    .replaceAll("_", " ")
    .replaceAll(" ", "-")
    .toLowerCase();
  console.log(str);
  return str;
}

// flatten array
const flatten = (ar) => {
  return ar.reduce((acc, item) => {
    var val = Array.isArray(item) ? flatten(item) : item;
    return acc.concat(val);
  }, []);
};
const arr = [
  [1, 2],
  [3],
  [
    [4, 5],
    [6, 7],
  ],
  [[[8, 9]]],
];

console.log(flatten(arr));

const firstVowelIndexInString = (str) => {
  const vowels = ["a", "e", "i", "o", "u"];
  const firstVowelIndex = str
    .split("")
    .findIndex((item) => vowels.some((v) => v === item));
  return firstVowelIndex;
};

// piglatin
function translatePigLatin(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const firstVowelIndex = str
    .split("")
    .findIndex((item) => vowels.some((v) => v === item));
  if (firstVowelIndex === 0) {
    str += "way";
  } else {
    const arr = str.split("");
    let consonants = arr.splice(0, firstVowelIndex).join("");
    str = arr.join("") + consonants + "ay";
    console.log(str);
  }
  return str;
}

translatePigLatin("california");

//Find the missing letter in the passed letter range and return it.
function fearNotLetter(str) {
  let al = "abcdefghijklmnopqrstuvwxyz";
  let firstIndex = al.indexOf(str.charAt(0));
  let lastIndex = al.indexOf(str.charAt(str.length - 1));
  let matchStr = al.slice(firstIndex, lastIndex + 1);
  return matchStr.split("").find((el) => !str.includes(el));
}

function convertHTML(str) {
  const map = new Map();
  map.set("&", "&amp;");
  map.set("<", "&lt;");
  map.set(">", "&gt;");
  map.set('"', "&quot;");
  map.set("'", "&apos;");
  let arr = str.split("");
  arr = arr.map((item) => {
    if (map.get(item)) {
      return map.get(item);
    } else {
      return item;
    }
  });
  str = arr.join("");
  console.log(str);
  return str;
}

convertHTML("Dolce & Gabbana");

// find lcm of a range
function smallestCommons(arr) {
  function gcd(a, b) {
    if (b % a === 0) return a;
    return gcd(b % a, a);
  }
  function lcm(a, b) {
    return (a * b) / gcd(a, b);
  }
  arr.sort((a, b) => a - b);
  let first = arr[0];
  let second = arr[1];
  let diff = second - first;
  const newArr = Array.from(Array(diff + 1), (x, i) => first + i);
  let multiple = 1;
  for (let num of newArr) {
    multiple = lcm(multiple, num);
  }
  return multiple;
}

smallestCommons([1, 5]);

// find word from binary characters
function binaryAgent(str) {
  const arr = str.split(" ");
  const resultArr = [];
  for (let item of arr) {
    resultArr.push(getChar(item));
  }
  return resultArr.join("");
}

function getChar(binary) {
  let num = 0;
  let last = binary.length - 1;
  let index = 0;
  while (last >= 0) {
    num += parseInt(binary.charAt(last--)) * Math.pow(2, index++);
  }
  return String.fromCharCode(num);
}

binaryAgent(
  "01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111"
);

// Caesar's Cypher - shift characters by 13
function rot13(str) {
  let newStr = "";
  for (let i = 0; i < str.length; i++) {
    let newCode = returnCode(str.charCodeAt(i));
    newStr += String.fromCharCode(newCode);
  }
  return newStr;
}

function returnCode(num) {
  if (num < 65 || num > 90) return num;
  if (num + 13 > 90) {
    return 65 + (num + 13) - 90 - 1;
  }
  return num + 13;
}

rot13("SERR PBQR PNZC");

const currValues = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1,
  FIVE: 5,
  TEN: 10,
  TWENTY: 20,
  "ONE HUNDRED": 100,
};

function checkCashRegister(price, cash, cid) {
  let change = cash - price;
  let obj = cid.reduce(
    (acc, item) => {
      acc.total += item[1];
      acc[item[0]] = item[1];
      return acc;
    },
    {
      total: 0,
    }
  );

  if (obj.total === change) {
    return {
      status: "CLOSED",
      change: cid,
    };
  }
  if (obj.total < change) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    };
  }
  let chArr = [];
  cid.sort((a, b) => currValues[b[0]] - currValues[a[0]]);
  for (let item of cid) {
    let value = 0;
    while (obj[item[0]] > 0 && change >= currValues[item[0]]) {
      change = change - currValues[item[0]];
      obj[item[0]] = obj[item[0]] - currValues[item[0]];
      value += currValues[item[0]];
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      chArr.push([item[0], value]);
    }
  }
  if (chArr.length === 0 || change > 0) {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: [],
    };
  }
  return {
    status: "OPEN",
    change: chArr,
  };
}

var res = checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);

console.log(res);

// convert to roman numerals
var convertToRoman = function (num) {
  var decimalValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var romanNumeral = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];

  var romanized = "";

  for (var index = 0; index < decimalValue.length; index++) {
    while (decimalValue[index] <= num) {
      romanized += romanNumeral[index];
      num -= decimalValue[index];
    }
  }

  return romanized;
};

// test here
convertToRoman(36);

function reverse(str) {
  function isAlpha(ch) {
    let code = ch.charCodeAt(0);
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
      return true;
    }
    return false;
  }
  let arr = str.split("");
  let start = 0,
    end = arr.length - 1;
  while (start < end) {
    if (isAlpha(arr[start])) {
      if (isAlpha(arr[end])) {
        let temp = arr[start];
        arr[start] = arr[end];
        arr[end] = temp;
        start++;
        end--;
      } else {
        end--;
      }
    } else {
      start++;
    }
  }
  return arr.join("");
}
