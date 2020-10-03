class Backtracking {
  binaryWatch(n) {
    const hours = [];
    const minutes = [];
    let time = '';
    const generateTime = (n, i) => {
      let a = 0, b = 0, x = 1;
      if (n === 0) {
        for (let j = 0; j < hours.length; j++) {
          a += hours[j] * x;
          x = x * 2;
        }
        x = 1;
        for (let j = 0; j < minutes.length; j++) {
          b += minutes[j] * x;
          x = x * 2;
        }

        if (a < 12 && a >= 0 && b < 60 && b >= 0) {
          let t = '';
          t += a + ':';
          if (b < 10) {
            t += '0';
          }
          t += b;
          time += ' ' + t;
        }
        return;
      }

      for (; i < 4; i++) {
        hours[i] = 1;
        generateTime(n - 1, i + 1);
        hours[i] = 0;
      }

      for (; i < 10; i++) {
        minutes[i - 4] = 1;
        generateTime(n - 1, i + 1);
        minutes[i - 4] = 0;
      }
    }
    generateTime(n, 0);
    return time;
  }

  printChangedCaseSequences(str) {
    const generateAllBinary = (n, len) => {
      const binaries = [];
      function generateBinary(inp) {
        let str = '';
        while (inp > 0) {
          let rem = inp % 2;
          str = rem + str;
          inp = Math.floor(inp / 2);
        }
        if (str.length < len) {
          let s = Array.from(Array(len - str.length), (x, i) => 0).join('');
          str = s + str;
        }
        binaries.push(str);
      }
      for (let j = 0; j <= n; j++) {
        generateBinary(j);
      }
      return binaries;
    }
    const maximumStrings = Math.pow(2, str.length);
    let binaries = generateAllBinary(maximumStrings, str.length);
    const finalResult = [];
    const inpArr = str.split('');
    for (let binary of binaries) {
      const newInp = [...inpArr];
      let binaryArr = binary.split('');
      for (let i = 0; i < newInp.length; i++) {
        if (binaryArr[i] === '1' && isNaN(newInp[i])) {
          newInp[i] = newInp[i].toUpperCase();
        }
      }
      let finalStr = newInp.join('');
      if (!finalResult.includes(finalStr))
        finalResult.push(finalStr);
    }
    console.log(finalResult.sort())
  }

  mobileDialpadWords(str) {
    let nums = str.split('');
    const mapping = new Map();
    mapping.set(2, 'abc');
    mapping.set(3, 'def');
    mapping.set(4, 'ghi');
    mapping.set(5, 'jkl');
    mapping.set(6, 'mno');
    mapping.set(7, 'pqrs');
    mapping.set(8, 'tuv');
    mapping.set(9, 'wxyz');
    const wordDictionary = [];
    const printWords = (ind = 0, output = []) => {
      if (ind === str.length) {
        wordDictionary.push(output.join(''));
        return;
      }
      for (let i = 0; i < mapping.get(+nums[ind]).length; i++) {
        output[ind] = mapping.get(+nums[ind])[i];

        printWords(ind + 1, output);
        if (+nums[i] === 0 || +nums[i] === 1)
          return;
      }
    }
    printWords();
    console.log(wordDictionary)
  }

  allCombinations(inp) {
    const swap = (arr, l, r) => {
      const inpArr = arr.split(' ');
      let temp = inpArr[l];
      inpArr[l] = inpArr[r];
      inpArr[r] = temp;
      return inpArr.join(' ');
    }
    const printComb = (str, start, end) => {
      if (start === end) {
        console.log(str);
      }
      for (let i = start; i <= end; i++) {
        str = swap(str, start, i);
        printComb(str, start + 1, end);
        str = swap(str, start, i);
      }
    }
    printComb(inp, 0, inp.split(' ').length - 1);
  }
}

let backTracking = new Backtracking();
console.log(backTracking.binaryWatch(1));

backTracking.printChangedCaseSequences('byt1e');
backTracking.mobileDialpadWords('27');

backTracking.allCombinations('1 2 3');
