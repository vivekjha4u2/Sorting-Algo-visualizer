import React from 'react'
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort.js'
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort'
import './SortingVisualizer.css';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort.js';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import Description from './Description.js'

var ANIMATION_SPEED_MS = 50;
var NUMBER_OF_ARRAY_BARS = 50;
//230
const PRIMARY_COLOR = 'aqua';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isAlgoRunning: false,
      arraySizeValue: 'large',
      // NUMBER_OF_ARRAY_BARS: 50,

      //to show description ..onclick of an algo we change State vars to specific algo.
      heading: "",
      desc: "",
      wt: "",
      avgt: "",
      bt: "",
      ws: ""
    };
  }

  componentDidMount() {
    this.resetArray();
    this.setState({ isAlgoRunning: true });
  }

  changeArraySize = (event) => {
    //to make this responsive for mobile devices-> divide screen width by width of 
    //array-bar to get the NUMBER_OF_ARRAY_BARS
    this.setState({ arraySizeValue: event.target.value });
    // console.log("event.target.value", event.target.value)
    //trying to get the width of arraybar

    if (event.target.value === 'small') {
      NUMBER_OF_ARRAY_BARS = 15
      this.resetArray();
      for (let i = 0; i < this.state.array.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[i].style.width = '70px'
      }
      console.log(this.state.array.length)

    }
    else if (event.target.value === 'medium') {
      // console.log(this.state.arraySizeValue)   this shows wrong ..dont know why
      NUMBER_OF_ARRAY_BARS = 26
      this.resetArray();
      for (let i = 0; i < this.state.array.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[i].style.width = '40px'
      }
    }
    else if (event.target.value === 'large') {
      // this.setState({ NUMBER_OF_ARRAY_BARS: 50 });
      // console.log(this.state.NUMBER_OF_ARRAY_BARS)
      NUMBER_OF_ARRAY_BARS = 50
      this.resetArray();
      for (let i = 0; i < this.state.array.length; i++) {
        const arrayBars = document.getElementsByClassName('array-bar');
        arrayBars[i].style.width = '20px'
      }
    }
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }
  setAnimSpeed(speed) {
    if (speed === 'slow')
      ANIMATION_SPEED_MS = 400;
    else if (speed === 'normal')
      ANIMATION_SPEED_MS = 50;
    else
      ANIMATION_SPEED_MS = 10;
  }

  render() {
    const { array } = this.state;
    return (
      <div className="container-fluid ">
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Sorting Algorithms Visualizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Animation Speed" id="basic-nav-dropdown">
                <NavDropdown.Item value="slow" onClick={() => { this.setAnimSpeed('slow') }} href="#speed:Slow">Slow</NavDropdown.Item>
                <NavDropdown.Item value="normal" onClick={() => { this.setAnimSpeed('normal') }} href="#speed:Normal">Normal</NavDropdown.Item>
                <NavDropdown.Item value="fast" onClick={() => { this.setAnimSpeed('fast') }} href="#speed:Fast">Fast</NavDropdown.Item>
              </NavDropdown>

              <label htmlFor="arraySize">arraySize:</label>

              <select name="arraySize" id="arraySize" onChange={this.changeArraySize} value={this.state.arraySizeValue}>
                <option disabled value="select">Select Size</option>
                <option value="small">small array</option>
                <option value="medium">medium array</option>
                <option value="large">large array</option>
                <option value="xl">xl array</option>
              </select>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
        <div className="array-container container">
          {array.map((value, idx) => (

            // <div className="array-bar-container" key={idx}>

            <div className="array-bar" key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}
            ></div>

            // </div>
          ))}

          <div className="container row">
            <button className="btn-info col-md-2" onClick={() => { this.resetArray() }}>Generate Array</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.selectionSort()}>Selection Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.quickSort()}>Quick Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.selectionSort()}>Heap Sort</button>
          </div>
        </div>

        <Description heading={this.state.heading}
          desc={this.state.desc}
          wt={this.state.wt} avgt={this.state.avgt} bt={this.state.bt} ws={this.state.ws}
        />
      </div>
    )
  }

  selectionSort() {
    // this.setState({ isAlgoRunning: true })
    // this.setState({
    //   heading: "SELECTION SORT",
    //   desc: `The selection sort algorithm sorts an array by repeatedly finding
    //  the minimum element (considering ascending order) from unsorted part and 
    //   putting it at the beginning. The algorithm maintains two subarrays in 
    //    a given array. 

    // 1) The subarray which is already sorted. 
    // 2) Remaining subarray which is unsorted. 

    // In every iteration of selection sort, the minimum element 
    //  (considering ascending order) from the unsorted subarray is  
    //  picked and moved to the sorted subarray.`,

    //   wt: "O(N^2)", avgt: "O(N^2)", bt: "O(N^2)", ws: "O(1)"
    // });

    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');

      if (animations[i].length === 2) {
        const [barJIndex, barMinIndex] = animations[i];
        const barJStyle = arrayBars[barJIndex].style;
        const barMinStyle = arrayBars[barMinIndex].style;
        if (i % 2 === 0) {
          setTimeout(() => {
            barJStyle.backgroundColor = 'yellow';
            barMinStyle.backgroundColor = 'black';
          }, i * ANIMATION_SPEED_MS)
        }
        else {
          setTimeout(() => {
            barJStyle.backgroundColor = PRIMARY_COLOR;
            barMinStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
      }
      else {
        const [barOneIdx, barTwoIdx, barOneHt, barTwoHt] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if (i % 2 === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            barTwoStyle.backgroundColor = SECONDARY_COLOR;

            console.log("barOneStyle.height before->" + barOneStyle.height + "### " + "barTwoStyle.height before->" + barTwoStyle.height);
            barOneStyle.height = `${barTwoHt}px`;
            barTwoStyle.height = `${barOneHt}px`;
            // console.log("barOneStyle.height after->" + barOneStyle.height + "### " + "barTwoStyle.height after->" + barTwoStyle.height);

          }, i * ANIMATION_SPEED_MS)
        }
        else {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
      }
    }
  }

  bubbleSort() {
    // this.setState({
    //   heading: "BUBBLE SORT",
    //   desc: `Bubble sort, sometimes referred to as sinking sort, is a simple
    //    sorting algorithm that repeatedly steps through the list, compares
    //     adjacent elements and swaps them if they are in the wrong order. 
    //     The pass through the list is repeated until the list is sorted.
    //      The algorithm, which is a comparison sort, is named for the way 
    //      smaller or larger elements "bubble" to the top of the list`,

    //   wt: "O(N^2)", avgt: "O(N^2)", bt: "O(N)", ws: "O(1)"
    // });

    const animations = getBubbleSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      // console.log(i + " " + animations.length);
      const [barOneIdx, barTwoIdx, barOneHt, barTwoHt, isSwap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      //last sorted elem color to green
      // i === this.state.array.length - decrement 1
      // 50 49 

      if (i % 2 !== 0) {
        setTimeout(() => {
          // barTwoStyle.width = `20px`;
          // barOneStyle.transform = 'translate(-5px, 0px)';
          // barTwoStyle.transform = 'translate(5px, 0px)';
          barOneStyle.backgroundColor = PRIMARY_COLOR;
          barTwoStyle.backgroundColor = PRIMARY_COLOR;
        }, i * ANIMATION_SPEED_MS)
      }
      else if (isSwap === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'yellow';
          barTwoStyle.backgroundColor = 'yellow';
        }, i * ANIMATION_SPEED_MS)
      }
      else if (isSwap === 1) {
        setTimeout(() => {
          // barOneStyle.transform = 'translate(5px, 0px)';
          // barTwoStyle.transform = 'translate(-5px, 0px)';
          // barTwoStyle.width = `15px`;
          barOneStyle.height = `${barTwoHt}px`;
          barTwoStyle.height = `${barOneHt}px`;
          barOneStyle.backgroundColor = SECONDARY_COLOR;
          barTwoStyle.backgroundColor = SECONDARY_COLOR;

        }, i * ANIMATION_SPEED_MS)
      }


      // setTimeout(() => {
      //   barOneStyle.backgroundColor = 'aqua';
      //   barTwoStyle.backgroundColor = 'aqua';
      //   arrayBars[this.state.array.length - i - 1].style.backgroundColor = "red"

      //   //trying to change color of last(sorted) elements to red
      //   // if (i < this.state.array.length) {
      //   //   // console.log(this.state.array.length - i - 1)
      //   //   // arrayBars[this.state.array.length - i - 1].style.backgroundColor = "red"
      //   // }

      // }, i * ANIMATION_SPEED_MS)
    }
  }

  mergeSort() {
    // this.setState({
    //   heading: "MERGE SORT",
    //   desc: `In computer science, merge sort (also commonly spelled mergesort)
    //    is an efficient, general-purpose, comparison-based sorting algorithm.
    //     Most implementations produce a stable sort, which means that the order
    //      of equal elements is the same in the input and output. Merge sort is
    //       a divide and conquer algorithm that was invented by John von
    //        Neumann in 1945.`,

    //   wt: "O(N(logN))", avgt: "O(N(logN))", bt: "O(N(logN))", ws: "O(N)"
    // });


    const animations = getMergeSortAnimations(this.state.array);
    // console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    // this.setState({
    //   heading: "QUICK SORT",
    //   desc: `Quicksort (sometimes called partition-exchange sort) is an
    //    efficient sorting algorithm. Developed by British computer scientist
    //     Tony Hoare in 1959[1] and published in 1961,[2] it is still a commonly
    //      used algorithm for sorting. When implemented well, it can be about two
    //       or three times faster than its main competitors, merge sort and
    //        heapsort.[3][contradictory]

    //   Quicksort is a divide-and-conquer algorithm. It works by selecting a 'pivot'
    //    element from the array and partitioning the other elements into two 
    //    sub-arrays, according to whether they are less than or greater than
    //     the pivot. The sub-arrays are then sorted recursively. This can be
    //      done in-place, requiring small additional amounts of memory to perform
    //       the sorting.`,

    //   wt: "O(N^2)", avgt: "O(N(logN))", bt: "O(N(logN))", ws: "O(logN)"
    // });

    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');

      if (animations[i].length === 1) {

        const [barOneIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        if (i % 2 === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = 'purple';
          }, i * ANIMATION_SPEED_MS)
        } else {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
      }

      //partition k liye (low or i) ko aage badhana aur (high or j) ko peeche lana
      //i aur j ka color change k liye 4 if else... 
      //lowOrHigh is 0 -> i ka color change k liye... AND viceversa
      else if (animations[i].length === 3) {
        const [barOneIdx, pivotBarIdx, lowOrHigh] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const pivotBarStyle = arrayBars[pivotBarIdx].style;
        if (lowOrHigh === 0 && i % 2 === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
            pivotBarStyle.backgroundColor = 'black';
          }, i * ANIMATION_SPEED_MS)
        }
        else if (lowOrHigh === 0 && i % 2 !== 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            pivotBarStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
        else if (lowOrHigh === 1 && i % 2 === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = 'green';
            pivotBarStyle.backgroundColor = 'black';
          }, i * ANIMATION_SPEED_MS)
        }
        else if (lowOrHigh === 1 && i % 2 !== 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            pivotBarStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
      }
      //swap k liye 4 element push huye h animations me
      //animations[i].length === 4
      else {
        const [barOneIdx, barTwoIdx, barOneHt, barTwoHt] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if (i % 2 === 0) {
          setTimeout(() => {
            barOneStyle.backgroundColor = 'yellow';
            barTwoStyle.backgroundColor = 'yellow';
            barOneStyle.height = `${barTwoHt}px`;
            barTwoStyle.height = `${barOneHt}px`;
          }, i * ANIMATION_SPEED_MS)
        }
        else {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }

      }


    }
  }
}
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}














//   // NOTE: This method will only work if your sorting algorithms actually return
//   // the sorted arrays; if they return the animations (as they currently do), then
//   // this method will be broken.
//   testSortingAlgorithms() {
//     for (let i = 0; i < 100; i++) {
//       const array = [];
//       const length = randomIntFromInterval(1, 1000);
//       for (let i = 0; i < length; i++) {
//         array.push(randomIntFromInterval(-1000, 1000));
//       }
//       const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
//       const mergeSortedArray = getMergeSortAnimations(array.slice());
//       console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
//     }
//   }



// // From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function arraysAreEqual(arrayOne, arrayTwo) {
//   if (arrayOne.length !== arrayTwo.length) return false;
//   for (let i = 0; i < arrayOne.length; i++) {
//     if (arrayOne[i] !== arrayTwo[i]) {
//       return false;
//     }
//   }
//   return true;
// }
