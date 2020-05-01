export function getSelectionSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    selectionSortHelper(array, animations);
    return animations;
}

function selectionSortHelper(array, animations) {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) minIndex = j;
        }
        // 3 4 2 1 5 9 6
        //maxvalue ko last me dalna h..
        // let k = 0;
        // for (; k < array.length - i - 1; k++) {
        //     if (maxvalue === array[k]) {
        //         break;
        //     }
        // }
        animations.push([minIndex, array[minIndex], array[i]]);
        // console.log(animations, "JJJJJJJJJJJJ");
        // break;

        let temp = array[minIndex];
        array[minIndex] = array[i];
        array[i] = temp;

    }
    console.log(array);
}
