class DivideAndConquer {
    findClosestInArray(arr, n) {
      let low = 0, high = arr.length - 1;
      if (n < arr[low])
        return arr[low];
      else if (n > arr[high])
        return arr[high];
      while (low < high) {
        let mid = low + Math.floor((high - low) / 2);
        if (arr[mid] === n) {
          return arr[mid];
        }
        else if (n < arr[mid]) {
          if (n > arr[mid - 1] && n < arr[mid]) {
            return this.getClosest(arr[mid - 1], arr[mid], n);
          }
          else {
            high = mid;
          }
        }
        else {
          if (n > arr[mid] && n < arr[mid + 1]) {
            return this.getClosest(arr[mid], arr[mid + 1], n);
          }
          else
            low = mid;
        }
      }
    }
    getClosest(first, second, target) {
      if (Math.abs(first - target) <= Math.abs(second - target))
        return first;
      else
        return second;
    }
  }
  
  const dandC = new DivideAndConquer();
  const arr = [1, 2, 3, 4, 5, 6, 8, 12];
  const n = 11;
  console.log(dandC.findClosestInArray(arr, n));