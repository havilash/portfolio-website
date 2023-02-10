
// https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


// Insertion Sort
export async function insertionSort(bars, draw){
    let n = bars.length
    for (let i = 1; i < n ; i++){
        let j = i
        
        while (j > 0 && bars[j-1] > bars[j]){
            [ bars[j], bars[j-1] ] = [ bars[j-1], bars[j] ]
            j = j - 1
            
            draw()

            await sleep(1)
        }
    }

    return bars
}

export async function selectionSort(bars, draw){
    let n = bars.length
    for (let i = 0; i < n-1; i++){
        var min = i
        for (let j = i + 1; j < n; j++){
            if (bars[min] > bars[j]){
                min = j
            }
        }
        let tmp = bars[i]
        bars[i] = bars[min]
        bars[min] = tmp
        
        draw()
        await sleep(1)
    }

    return bars
}


// Merge Sort
export async function mergeSort(arr, draw) {
    var n = arr.length
  
    var curr_size;
    var left_start;

    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) {
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) {
            var mid = Math.min(left_start + curr_size - 1, n - 1);
            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
            merge(arr, left_start, mid, right_end);
            
            draw();
            await sleep(10)
        }
    }

    return arr
}

function merge(arr , l , m , r) {
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;

    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

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


// Heap Sort
export async function heapSort(arr, draw)
{
    var N = arr.length;

    for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
        await heapify(arr, N, i, draw);
    
    for (var i = N - 1; i > 0; i--) {
        var temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        await heapify(arr, i, 0, draw);
    }

    return arr
}

async function heapify(arr, N, i, draw)
{
    var largest = i; 
    var l = 2 * i + 1; 
    var r = 2 * i + 2; 

    
    if (l < N && arr[l] > arr[largest])
        largest = l;

    if (r < N && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        var swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;

        await heapify(arr, N, largest, draw);
    }

    draw()
    await sleep(1)
}
 
 
// Quick Sort
export async function quickSort(arr, draw){
    return await qSort(arr, 0, arr.length - 1, draw)
}

async function qSort(arr, low, high, draw) {
    if (low < high) {
 
        let pi = partition(arr, low, high, draw);
        draw()
        await sleep(1)
 
        qSort(arr, low, pi - 1, draw);
        qSort(arr, pi + 1, high, draw);
    }

    return arr
}

function partition(arr, low, high, draw) {
 
    let pivot = arr[high];
 
    let i = (low - 1);
 
    for (let j = low; j <= high - 1; j++) {
 
        if (arr[j] < pivot) {
 
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, high);
    return (i + 1);
}


// Shell Sort
export async function shellSort(arr, draw)
{
    let n = arr.length;
   
    for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        for (let i = gap; i < n; i += 1) {
            let temp = arr[i];

            let j;
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap)
                arr[j] = arr[j - gap];

            arr[j] = temp;

            draw()
            await sleep(1)
        }
    }
    return arr;
}


// Bubble Sort
export async function bubbleSort( arr, draw ) {
    const n = arr.length;
    var i, j;
    for (i = 0; i < n-1; i++) {
        for (j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                swap(arr,j,j+1);

                draw()
                await sleep(1)
            }
        }
    }
}


// Comb Sort
export async function combSort(arr, draw){
    let n = arr.length;
    let gap = n;
    let swapped = true;

    while (gap != 1 || swapped == true) {
        gap = getNextGap(gap);

        swapped = false;

        for (let i=0; i<n-gap; i++) {
            if (arr[i] > arr[i+gap]) {
                let temp = arr[i];
                arr[i] = arr[i+gap];
                arr[i+gap] = temp;

                swapped = true;
                draw();
                await sleep(1)
            }
        }
    }
}

function getNextGap(gap) {
    gap = parseInt((gap*10)/13, 10);
    if (gap < 1)
        return 1;
    return gap;
}


// Bogo Sort
export async function bogoSort(arr, draw) {
  while (!isSorted(arr)) {
  	arr = shuffle(arr);
    draw();
    await sleep(1)
  }
  return arr;
}

function isSorted(arr) {
    for(var i = 1; i < arr.length; i++){
        if (arr[i-1] > arr[i]) {
            return false;
        }
    }
    return true;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


