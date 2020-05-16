import React from 'react'
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js'
import { getBubbleSortAnimations } from '../sortingAlgorithms/BubbleSort'
import './SortingVisualizer.css';
import { getSelectionSortAnimations } from '../sortingAlgorithms/SelectionSort.js';
import { Nav, Navbar } from 'react-bootstrap'

const ANIMATION_SPEED_MS = 1;
const NUMBER_OF_ARRAY_BARS = 230;
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

  render() {
    const { array } = this.state;
    return (
      <div className="container-fluid ">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Sorting Algorithms Visualizer</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Navbar>
        <div className="array-container ">
          {array.map((value, idx) => (
            <div className="array-bar" key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`
              }}
            ></div>
          ))}
          <div className="container row">
            <button className="btn-info col-md-2" onClick={() => { this.resetArray() }}>Generate Array</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.mergeSort()}>Merge Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.bubbleSort()}>Bubble Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.selectionSort()}>Selection Sort</button>
            <button className="btn-primary col-md-2" disabled={!this.state.isAlgoRunning} onClick={() => this.selectionSort()}>Quick Sort</button>
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
      const [barOneIdx, barOneHt, barTwoHt] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[i].style;
      for (let j = i + 1; j < animations.length; j++) {
        setTimeout(() => {
          arrayBars[j].style.backgroundColor = 'red'
        }, i * ANIMATION_SPEED_MS)
        setTimeout(() => {
          arrayBars[j].style.backgroundColor = 'aqua'
        }, i * ANIMATION_SPEED_MS)
      }
      setTimeout(() => {
        // barOneStyle.borderWidth = '1px';
        // barOneStyle.backgroundColor = 'red';
        barOneStyle.height = `${barTwoHt}px`;
        barTwoStyle.height = `${barOneHt}px`;
        arrayBars[i].style.backgroundColor = "red";
        // barOneStyle.backgroundColor = "aqua";
      }, i * ANIMATION_SPEED_MS)
    }

  }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, barOneHt, barTwoHt, isSwap] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      const color = i % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

      if (isSwap === 0) {
        setTimeout(() => {
          barOneStyle.backgroundColor = 'yellow';
          barTwoStyle.backgroundColor = 'yellow';
        }, i * ANIMATION_SPEED_MS)
      }
      else {
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
          barOneStyle.height = `${barTwoHt}px`;
          barTwoStyle.height = `${barOneHt}px`;
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
    console.log(animations);
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
