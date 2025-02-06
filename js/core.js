// Global
let x;
let y;
let previousOperator;
let currentOperator;
let output;
const MAX_NUMBER_LENGTH = 12;
const SCREEN_OUTPUT = document.querySelector("#screen-output");

// Reset default values
clearData();

// Add Thing To Calculation
function updateDisplay(newText){
  SCREEN_OUTPUT.textContent = newText;
}

function setOperator(test){
  isXSet = x.length > 0;
  isYSet = y.length > 0;

  // Only set after x and before y
  if (isXSet && !isYSet){
    currentOperator = test;
    console.log("current operator",currentOperator);
  }
}

function setNumber(test){
  // Operator set impplies number 1 is set.
  if (currentOperator == ""){
    if (x.length < MAX_NUMBER_LENGTH){
      x.push(test);
      updateDisplay(x.join(''));
    }
  }
  else{
    if (y.length < MAX_NUMBER_LENGTH){
      y.push(test);
      updateDisplay(y.join(''));
    }
  }
}

function appendValue(button){
  let value = button.getAttribute("data-value");

  if ("+-*/".includes(value)){
    setOperator(value);
    return;
  }
  
  setNumber(value);
  console.log("x",x);
  console.log("y",y);
  console.log("current operator",currentOperator);
}

function removeValue(){
  // 
  if ((currentOperator == "") | (currentOperator != "" && x.length > 0)){
    if (x.length > 0){
      x.pop();
      updateDisplay(x.join(''));
    }
  }
  else{
    if (y.length > 0){
      y.pop();
      updateDisplay(y.join(''));
    }
  }
}

// Calculate
function clearData(){
  x = [];
  y = [];
  previousOperator = "";
  currentOperator = "";
  output = "";
  
  updateDisplay("");

  console.log("x",x);
  console.log("y",y);
  console.log("current operator",currentOperator);
}

function add(num1,num2){
  return num1 + num2;
}

function subtract(num1,num2){
  return num1 - num2;
}

function multiply(num1,num2){
  return num1 * num2;
}

function divide(num1,num2){
  return num1 / num2;
}

function operate(){
  // Check All Values Present
  isXSet = x.length > 0;
  isOpSet = currentOperator != "";
  isYSet = y.length > 0;

  if (isXSet & isOpSet & isYSet){
    console.log("Calculate answer");

    // Convert inputs to floats
    let newX = parseFloat(x.join(''));
    let newY = parseFloat(y.join(''));

    // Apply math operation
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
        output = 0;
    }

    // Replace x with output
    x = output.toString().split('');
    y = [];
    console.log("output",output);
    console.log("output x",x);
    updateDisplay(x.join(''))
  }
  else{
    console.log("Not all values present");
    return;
  }
}