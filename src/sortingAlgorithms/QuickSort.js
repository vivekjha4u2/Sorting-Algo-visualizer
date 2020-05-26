export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    QuickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}
function partition(array, low, high, animations) {
    let pivot = array[low];
    let i = low - 1;
    let j = high + 1;

    while (true) {
        // Find leftmost element greater 
        // than or equal to pivot 
        do {
            i++;
            animations.push([i, low, 0]);
            animations.push([i, low, 0]);
        } while (array[i] < pivot);

        // Find rightmost element smaller 
        // than or equal to pivot 
        do {
            j--;
            animations.push([j, low, 1]);
            animations.push([j, low, 1]);
        } while (array[j] > pivot);

        // If two pointers met. 
        if (i >= j) {
            animations.push([j]);
            animations.push([j]);
            return j;
        }
        animations.push([i, j, array[i], array[j]]);
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        //swap(arr[i], arr[j]); 


        animations.push([i, j, array[i], array[j]]);
    }
}

function QuickSortHelper(array, low, high, animations) {
    if (low < high) {
        /* pi is partitioning index,  
        arr[p] is now at right place */
        let pi = partition(array, low, high, animations);

        // Separately sort elements before 
        // partition and after partition 
        QuickSortHelper(array, low, pi, animations);
        QuickSortHelper(array, pi + 1, high, animations);
        // console.log(array);
    }
}