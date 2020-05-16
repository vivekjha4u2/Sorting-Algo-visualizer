export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                //when swapping is done we push 1 else 0
                animations.push([j, j + 1, array[j + 1], array[j], 1]);
                animations.push([j, j + 1, array[j + 1], array[j], 1]);
            } else {
                animations.push([j, j + 1, array[j + 1], array[j], 0]);
                animations.push([j, j + 1, array[j + 1], array[j], 0]);
            }
        }
    }
}


