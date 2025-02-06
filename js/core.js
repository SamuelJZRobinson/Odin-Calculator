// Global
x = [];
y = [];
previousOperator = "";
currentOperator = "";
output = "";
const MAX_NUMBER_LENGTH = 9;

// Add Thing To Calculation
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
    }
  }
  else{
    if (y.length < MAX_NUMBER_LENGTH){
      y.push(test);
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

// Calculate
function clearData(){
  x = [];
  y = [];
  previousOperator = "";
  currentOperator = "";
  output = "";

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

    let newX = parseFloat(x.join(''));
    console.log(newX);
    let newY = parseFloat(y.join(''));
    console.log(newY);

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
    console.log("Output",output);
  }
  else{
    console.log("Not all values present");
    return;
  }
}