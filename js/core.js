// Tutorials Used:
// Web Dev Simplified. (17 April 2019). Build A Calculator With JavaScript Tutorial. YouTube. https://youtu.be/j59qQ7YWLxw?si=qifx8xlTlX1xvWgW

// DOM
const PREVIOUS_OPERAND = document.querySelector("#previous-operand");
const CURRENT_OPERAND = document.querySelector("#current-operand");

const BUT_NUMBERS = document.querySelectorAll("button[data-number]");
const BUT_OPERATIONS = document.querySelectorAll("button[data-operation]");
const BUT_CLEAR = document.querySelector("button[data-clear]");
const BUT_BACKSPACE = document.querySelector("button[data-backspace]");
const BUT_EQUALS = document.querySelector("button[data-equals]");

// Events
BUT_NUMBERS.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

BUT_OPERATIONS.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

BUT_EQUALS.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

BUT_CLEAR.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

BUT_BACKSPACE.addEventListener("click", button => {
  calculator.backspace();
  calculator.updateDisplay();
});

// Functions
class Calculator{
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;

    this.clear();
    this.updateDisplay();
  }

  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  backspace() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  /**
   * Adds two numbers together.
   * 
   * @param {*} x - x
   * @param {*} y - y
   * @returns - number using the same input format.
   */
  add(x, y){
    return x + y;
  }

  /**
   * Subtracts two numbers together.
   * 
   * @param {*} x - x
   * @param {*} y - y
   * @returns - number using the same input format.
   */
  subtract(x, y){
    return x - y;
  }

  /**
   * Multiplies two numbers together.
   * 
   * @param {*} x - x
   * @param {*} y - y
   * @returns - number using the same input format.
   */
  multiply(x, y){
    return x * y;
  }

  /**
   * Divides two numbers together.
   * 
   * @param {*} x - x
   * @param {*} y - y
   * @returns - number using the same input format.
   */
  divide(x, y){
    return x / y;
  }

  compute() {
    let output;
    const PREVIOUS_NUMBER = parseFloat(this.previousOperand);
    const CURRENT_NUMBER = parseFloat(this.currentOperand);
    if (isNaN(PREVIOUS_NUMBER) || isNaN(CURRENT_NUMBER)) return;
    switch (this.operation){
      case '+':
        output = this.add(PREVIOUS_NUMBER, CURRENT_NUMBER);
        break;
      case '-':
        output = this.subtract(PREVIOUS_NUMBER, CURRENT_NUMBER);
        break;
      case '×':
        output = this.multiply(PREVIOUS_NUMBER, CURRENT_NUMBER);
        break;
      case '÷':
        output = this.divide(PREVIOUS_NUMBER, CURRENT_NUMBER);
        break;
      default:
        return;
    }
    this.currentOperand = output;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const STRING_NUMBER = number.toString();
    const INTEGER_DIGITS = parseFloat(STRING_NUMBER.split('.')[0]);
    const DECIMAL_DIGITS = STRING_NUMBER.split('.')[1];
    let integerDisplay;
    if (isNaN(INTEGER_DIGITS)) {
      integerDisplay = "";
    }
    else {
      integerDisplay = INTEGER_DIGITS.toLocaleString("en", {maximumFractionDigits: 0})
    }

    if (DECIMAL_DIGITS != null) {
      return `${integerDisplay}.${DECIMAL_DIGITS}`;
    }
    else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    }
    else {
      this.previousOperandTextElement.innerText = "";
    }
  }
}

let calculator = new Calculator(PREVIOUS_OPERAND, CURRENT_OPERAND);