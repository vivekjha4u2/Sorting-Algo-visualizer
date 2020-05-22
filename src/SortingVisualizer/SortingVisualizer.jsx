import React from 'react'
import { getMergeSortAnimations } from '../sortingAlgorithms/MergeSort.js'
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort'
import './SortingVisualizer.css';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort.js';
import { getQuickSortAnimations } from '../sortingAlgorithms/QuickSort.js';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

var ANIMATION_SPEED_MS = 50;
const NUMBER_OF_ARRAY_BARS = 50;
//230
const PRIMARY_COLOR = 'aqua';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      isAlgoRunning: false,
    };
  }

  componentDidMount() {
    this.resetArray();
    this.setState({ isAlgoRunning: true });
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
                <NavDropdown.Item onClick={() => { this.setAnimSpeed('slow') }} href="#speed:Slow">Slow</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { this.setAnimSpeed('normal') }} href="#speed:Normal">Normal</NavDropdown.Item>
                <NavDropdown.Item onClick={() => { this.setAnimSpeed('fast') }} href="#speed:Fast">Fast</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </Navbar>
        <div className="array-container ">
          {array.map((value, idx) => (

            <div className="array-bar-container" key={idx}>

              <div className="array-bar" key={idx}
                style={{
                  backgroundColor: PRIMARY_COLOR,
                  height: `${value}px`
                }}
              ></div>

            </div>
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
      </div>
    )
  }

  selectionSort() {
    this.setState({ isAlgoRunning: true })

    const animations = getSelectionSortAnimations(this.state.array);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');

      if (animations[i].length === 1) {
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
            console.log("barOneStyle.height after->" + barOneStyle.height + "### " + "barTwoStyle.height after->" + barTwoStyle.height);

          }, i * ANIMATION_SPEED_MS)
        }
        else {
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i * ANIMATION_SPEED_MS)
        }
      }




      // const barOneStyle = arrayBars[barOneIdx].style;
      // const barTwoStyle = arrayBars[i].style;
      // for (let j = i + 1; j < animations.length; j++) {
      //   setTimeout(() => {
      //     arrayBars[j].style.backgroundColor = 'red'
      //   }, i * ANIMATION_SPEED_MS)
      //   setTimeout(() => {
      //     arrayBars[j].style.backgroundColor = 'aqua'
      //   }, i * ANIMATION_SPEED_MS)
      // }
      // setTimeout(() => {
      //   // barOneStyle.borderWidth = '1px';
      //   // barOneStyle.backgroundColor = 'red';
      //   barOneStyle.height = `${barTwoHt}px`;
      //   barTwoStyle.height = `${barOneHt}px`;
      //   arrayBars[i].style.backgroundColor = "red";
      //   // barOneStyle.backgroundColor = "aqua";
      // }, i * ANIMATION_SPEED_MS)
    }

  }

  bubbleSort() {
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
    const animations = getQuickSortAnimations(this.state.array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');

      //partition k liye (low or i) ko aage badhana aur (high or j) ko peeche lana
      //i aur j ka color change k liye 4 if else... 
      //lowOrHigh is 0 -> i ka color change k liye... AND viceversa
      if (animations[i].length === 3) {
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
