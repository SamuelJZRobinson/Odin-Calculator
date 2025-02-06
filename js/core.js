// Global
let x;
let y;
let currentOperator;
let output;
const MAX_NUMBER_LENGTH = 12;
const SCREEN_OUTPUT = document.querySelector("#screen-output");
clearData();

// Modify Data
/**
 * Updates the calculator display with a string.
 * 
 * @param {*} newText - The new text to update the display.
 */
function updateDisplay(newText){
  SCREEN_OUTPUT.textContent = newText;
}

/**
 * Sets the operator that affects both numbers. 
 * Only set the operator between both numbers when x is set but y is not set.
 * 
 * @param {*} newOperator - The new operator char to overwrite the operator.
 */
function setOperator(newOperator){
  isXSet = x.length > 0;
  isYSet = y.length > 0;
  
  if (isXSet && !isYSet){
    currentOperator = newOperator;
  }
}

/**
 * Appends a number onto the active number array.
 * The active number is based on whether the operator is set, not set is x and set is y.
 * 
 * @param {*} newDigit - The new digit char to append onto a number array.
 */
function appendNumber(newDigit){
  if (currentOperator == ""){
    if (x.length < MAX_NUMBER_LENGTH){
      x.push(newDigit);
      updateDisplay(x.join(''));
    }
  }
  else{
    if (y.length < MAX_NUMBER_LENGTH){
      y.push(newDigit);
      updateDisplay(y.join(''));
    }
  }
}

/**
 * The root for appending operators and numbers.
 * 
 * @param {*} button - The button that called the function, retrieves the data-value from it.
 * @returns Nothing, early return to avoid errors by passing an operator into the number checker.
 */
function appendValue(button){
  let value = button.getAttribute("data-value");

  if ("+-*/".includes(value)){
    setOperator(value);
    return;
  }
  
  appendNumber(value);
}

/**
 * Removes items from the active number array based on whether the operator is set, not set is x and set is y.
 * Single subtraction symbols are removed from number arrays to avoid nan errors.
 */
function removeValue(){
  if ((currentOperator == "")){
    if (x.length > 0){
      x.pop();

      if(x.length == 1){
        if(x.includes("-")){
          x = [];
        }
      }

      updateDisplay(x.join(''));
    }
  }
  else{
    if (y.length > 0){
      y.pop();

      if(y.length == 1){
        if(y.includes("-")){
          y = [];
        }
      }

      updateDisplay(y.join(''));
    }
  }
}

const DECIMAL = '.';
/**
 * Adds decimal to active number based on whether the operator is set, not set is x and set is y.
 * Numbers can only have one decimal.
 */
function addDecimal(){
    if (currentOperator == ""){
      if (x.length < MAX_NUMBER_LENGTH){
        if (!x.includes(DECIMAL)){
          x.push(DECIMAL);
          updateDisplay(x.join(''));
        }
      }
    }
    else{
      if (y.length < MAX_NUMBER_LENGTH){
        if (!y.includes(DECIMAL)){
          y.push(DECIMAL);
          updateDisplay(y.join(''));
        }
      }
    }
}

// Calculate
/**
 * Resets all data to its default state.
 */
function clearData(){
  x = [];
  y = [];
  currentOperator = "";
  output = "";
  
  updateDisplay("");
  console.log("Clear data");
}

/**
 * Adds two numbers together.
 * 
 * @param {*} num1 - x
 * @param {*} num2 - y
 * @returns - number using the same input format.
 */
function add(num1,num2){
  return num1 + num2;
}

/**
 * Subtracts two numbers together.
 * 
 * @param {*} num1 - x
 * @param {*} num2 - y
 * @returns - number using the same input format.
 */
function subtract(num1,num2){
  return num1 - num2;
}

/**
 * Multiplies two numbers together.
 * 
 * @param {*} num1 - x
 * @param {*} num2 - y
 * @returns - number using the same input format.
 */
function multiply(num1,num2){
  return num1 * num2;
}

/**
 * Divides two numbers together.
 * 
 * @param {*} num1 
 * @param {*} num2 
 * @returns - number using the same input format.
 */
function divide(num1,num2){
  return num1 / num2;
}

/**
 * Solve the equation.
 * Number 1, operator, and number 2 must be set.
 * Converting numbers to floats ensures decimal values can be calculated.
 */
function operate(){
  // Check all values set
  isXSet = x.length > 0;
  isOpSet = currentOperator != "";
  isYSet = y.length > 0;

  if (isXSet & isOpSet & isYSet){
    console.log("Calculate answer");

    // Convert inputs to floats
    let newX = parseFloat(x.join(''));
    let newY = parseFloat(y.join(''));

    // Apply math operation based on operator
    switch(currentOperator){
      case "+":
        output = add(newX,newY);
        break;
      case "-":
        output = subtract(newX,newY);
        break;
      case "*":
        output = multiply(newX,newY);
        break;
      case "/":
        output = divide(newX,newY);
        break;
      default:
        console.log("Calculation default triggered");
        output = 0;
    }

    // Replace x with output
    x = output.toString().split('');
    y = [];
    currentOperator = "";
    updateDisplay(x.join(''));
  }
  else{
    console.log("Not all values present");
  }
}