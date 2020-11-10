const findFreq = (arr, k) => {
    const upperbound = (arr, start, end, key) => {
      while (start < end) {
        let mid = start + Math.round((end - start) / 2);
        if (arr[mid] > key)
          end = mid - 1;
        else
          start = mid + 1;
      }
      return start;
    }
    let upper = upperbound(arr, 0, arr.length - 1, k);
  
    const lowerbound = (arr, start, end, k) => {
      while (start < end) {
        let mid = start + Math.round((end - start) / 2);
        if(arr[mid] < k)
         start = mid + 1;
         else
         end = mid - 1;
      }
      return end;
    }
    let lower = lowerbound(arr,0,arr.length - 1,k);
    console.log(lower,upper)
  }
  
  const arr = [1, 1, 2, 2, 4, 5, 5, 5, 5];
  let k = 2;
  
  findFreq(arr, k);