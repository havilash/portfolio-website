// https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms

import { sleep } from "src/services/Utils";

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

// Insertion Sort
export async function insertionSort(bars, draw) {
  let n = bars.length;
  for (let i = 1; i < n; i++) {
    let j = i;

    while (j > 0 && bars[j - 1] > bars[j]) {
      [bars[j], bars[j - 1]] = [bars[j - 1], bars[j]];
      j = j - 1;

      draw();
      await sleep(1);
    }
  }

  return bars;
}

// Selection Sort
export async function selectionSort(bars, draw) {
  let n = bars.length;
  for (let i = 0; i < n - 1; i++) {
    var min = i;
    for (let j = i + 1; j < n; j++) {
      if (bars[min] > bars[j]) {
        min = j;
      }
    }
    let tmp = bars[i];
    bars[i] = bars[min];
    bars[min] = tmp;

    draw();
    await sleep(1);
  }

  return bars;
}

// Merge Sort
export async function mergeSort(arr, draw) {
  var n = arr.length;

  var curr_size;
  var left_start;

  for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
    for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
      var mid = Math.min(left_start + curr_size - 1, n - 1);
      var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
      merge(arr, left_start, mid, right_end);

      draw();
      await sleep(10);
    }
  }

  return arr;
}

function merge(arr, l, m, r) {
  var i, j, k;
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = Array(n1).fill(0);
  var R = Array(n2).fill(0);

  for (i = 0; i < n1; i++) L[i] = arr[l + i];
  for (j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  i = 0;
  j = 0;
  k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}

// Heapsort
export async function heapsort(arr, draw) {
  var N = arr.length;

  for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
    await heapify(arr, N, i, draw);

  for (var i = N - 1; i > 0; i--) {
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    await heapify(arr, i, 0, draw);
  }

  return arr;
}

async function heapify(arr, N, i, draw) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (l < N && arr[l] > arr[largest]) largest = l;

  if (r < N && arr[r] > arr[largest]) largest = r;

  if (largest !== i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    await heapify(arr, N, largest, draw);
  }

  draw();
  await sleep(1);
}

// Quicksort
export async function quicksort(arr, draw) {
  return await quickSortRec(arr, 0, arr.length - 1, draw);
}

async function quickSortRec(arr, low, high, draw) {
  if (low < high) {
    let pi = partition(arr, low, high, draw);
    draw();
    await sleep(1);

    quickSortRec(arr, low, pi - 1, draw);
    quickSortRec(arr, pi + 1, high, draw);
  }

  return arr;
}

function partition(arr, low, high, draw) {
  let pivot = arr[high];

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return i + 1;
}

// Shell Sort
export async function shellsort(arr, draw) {
  let n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];

      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
        arr[j] = arr[j - gap];

      arr[j] = temp;

      draw();
      await sleep(1);
    }
  }
  return arr;
}

// Bubble Sort
export async function bubbleSort(arr, draw) {
  const n = arr.length;
  var i, j;
  for (i = 0; i < n - 1; i++) {
    for (j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);

        draw();
        await sleep(1);
      }
    }
  }
}

// Comb Sort
export async function combSort(arr, draw) {
  let n = arr.length;
  let gap = n;
  let swapped = true;

  while (gap !== 1 || swapped === true) {
    gap = getNextGap(gap);

    swapped = false;

    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        let temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;

        swapped = true;
        draw();
        await sleep(1);
      }
    }
  }
}

function getNextGap(gap) {
  gap = parseInt((gap * 10) / 13, 10);
  if (gap < 1) return 1;
  return gap;
}

// Bogo Sort
export async function bogoSort(arr, draw) {
  while (!isSorted(arr)) {
    arr = shuffle(arr);
    draw();
    await sleep(1);
  }
  return arr;
}

function isSorted(arr) {
  for (var i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Cycle Sort
export async function cycleSort(list, draw) {
  for (let cycleStart = 0; cycleStart < list.length; cycleStart++) {
    let value = list[cycleStart];
    let position = cycleStart;

    // search position
    for (let i = cycleStart + 1; i < list.length; i++) {
      if (list[i] < value) {
        position++;
      }
    }
    // if it is the same, continue
    if (position === cycleStart) {
      continue;
    }
    while (value === list[position]) {
      position++;
    }

    const oldValue = list[position];
    list[position] = value;
    value = oldValue;
    draw();
    await sleep(1);

    // rotate the rest
    while (position !== cycleStart) {
      position = cycleStart;
      for (let i = cycleStart + 1; i < list.length; i++) {
        if (list[i] < value) {
          position++;
        }
      }
      while (value === list[position]) {
        position++;
      }
      const oldValueCycle = list[position];
      list[position] = value;
      value = oldValueCycle;
      draw();
      await sleep(1);
    }
  }
  return list;
}

// Cocktail Shaker Sort
export async function cocktailShakerSort(inputArr, draw) {
  let n = inputArr.length;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (let i = 0; i < n - 1; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        let tmp = inputArr[i];
        inputArr[i] = inputArr[i + 1];
        inputArr[i + 1] = tmp;
        sorted = false;
        draw();
        await sleep(1);
      }
    }

    if (sorted) break;
    sorted = true;

    for (let j = n - 1; j > 0; j--) {
      if (inputArr[j - 1] > inputArr[j]) {
        let tmp = inputArr[j];
        inputArr[j] = inputArr[j - 1];
        inputArr[j - 1] = tmp;
        sorted = false;
        draw();
        await sleep(1);
      }
    }
  }

  return inputArr;
}

// Gnome Sort
export async function gnomeSort(arr, draw) {
  let n = arr.length;
  let index = 0;

  while (index < n) {
    if (index === 0) index++;
    if (arr[index] >= arr[index - 1]) index++;
    else {
      let temp = 0;
      temp = arr[index];
      arr[index] = arr[index - 1];
      arr[index - 1] = temp;
      index--;
      draw();
      await sleep(1);
    }
  }
  return;
}

// Bitonic Sort
export async function bitonicSort(arr, draw) {
  const N = arr.length;
  var i, j, k;
  for (k = 2; k <= N; k = 2 * k) {
    for (j = k >> 1; j > 0; j = j >> 1) {
      for (i = 0; i < N; i++) {
        let ixj = i ^ j;
        if (ixj > i) {
          if ((i & k) === 0 && arr[i] > arr[ixj]) swap(arr, i, ixj);
          if ((i & k) !== 0 && arr[i] < arr[ixj]) swap(arr, i, ixj);
          draw();
          await sleep(1);
        }
      }
    }
  }

  combSort(arr, draw);
  return arr;
}

// Sleep Sort
export async function sleepSort(arr, draw) {
  let copy = [...arr];
  let n = arr.length;
  let max = Math.max(...arr);
  while (arr.length) {
    arr.pop();
    draw();
    await sleep(1);
  }
  while (copy.length) {
    const v = copy.pop();
    setTimeout(() => {
      arr.push(v);
      draw();
    }, (v / max) * (10 * n));
  }
  return arr;
}
