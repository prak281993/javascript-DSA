function merge(arr, left, mid, right) {
    const leftArr = [], rightArr = [];
    let n1 = mid - left + 1, n2 = right - mid;
    let i = 0, j = 0, k = left;
    for (i = 0; i < n1; i++) {
      leftArr.push(arr[left + i]);
    }
    for (i = 0; i < n2; i++) {
      rightArr.push(arr[mid + i + 1]);
    }
    i = 0; j = 0;
    while (i < n1 && j < n2) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      }
      else {
        arr[k++] = rightArr[j++];
      }
    }
    while (i < n1) {
      arr[k++] = leftArr[i++];
    }
    while (j < n2) {
      arr[k++] = rightArr[j++];
    }
  }
  
  function mergeSort(arr, left, right) {
    if (left >= right)
      return;
    let mid = left + Math.floor((right - left) / 2);
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
  }
  
  const arr = [5, 2, 6, 8, 9, 4, 3, 12, 56, 24];
  mergeSort(arr, 0, arr.length);
  console.log(arr)