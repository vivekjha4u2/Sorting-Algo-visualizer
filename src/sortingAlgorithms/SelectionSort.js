export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    // console.log(array);
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(array, animations) {

    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) minIndex = j;
            animations.push([j, minIndex]);
            animations.push([j, minIndex]);
        }
        animations.push([minIndex, i, array[minIndex], array[i]]);
        let temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;

        animations.push([minIndex, i, array[minIndex], array[i]]);



    }
    // console.log(array);
}
