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
// Add Number
BUT_NUMBERS.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

// Add Operator
BUT_OPERATIONS.forEach(button => {
  button.addEventListener("click", () => {
    calculator.setOperation(button.innerText);
    calculator.updateDisplay();
  })
})

// Equals
BUT_EQUALS.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

// Clear
BUT_CLEAR.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

// Backspace
BUT_BACKSPACE.addEventListener("click", button => {
  calculator.backspace();
  calculator.updateDisplay();
});

// Core Logic
/**
 * A calculator that performs basic arithmetic (+, -, *, /) on two operands.
 * Other Features: clear, backspace, and updating the UI.
 */
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;

    this.clear();
    this.updateDisplay();
  }

  /**
   * Clear the calculator screen to its default state.
   */
  clear() {
    this.previousOperand = this.currentOperand = "";
    this.operation = undefined;
  }

  /**
   * Remove the last character from the current operand string.
   */
  backspace() {
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
  }

  /**
   * Concatenate the current operand string with a number.
   * 
   * @param {*} number Number being added.
   * @returns Nothing, avoid duplicate decimal places.
   */
  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  /**
   * Sets the operator for the current operand.
   * 
   * @param {*} operation Operation (+, -, *, /)
   * @returns Nothing, avoids setting the operation if the current operand string hasn't been set.
   */
  setOperation(operation) {
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
   * @param {*} x Float first number.
   * @param {*} y Float second number.
   * @returns Float output.
   */
  add(x, y) {
    return x + y;
  }

  /**
   * Subtracts two numbers together.
   * 
   * @param {*} x Float first number.
   * @param {*} y Float second number.
   * @returns Float output.
   */
  subtract(x, y) {
    return x - y;
  }

  /**
   * Multiplies two numbers together.
   * 
   * @param {*} x Float first number.
   * @param {*} y Float second number.
   * @returns Float output.
   */
  multiply(x, y) {
    return x * y;
  }

  /**
   * Divides two numbers together.
   * 
   * @param {*} x Float first number.
   * @param {*} y Float second number.
   * @returns Float output.
   */
  divide(x, y) {
    return x / y;
  }

  /**
   * Solves the equation by parsing the previous operand and current operand.
   * 
   * @returns Nothing.
   */
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

  /**
   * Formats the integer portion of a string number with commas for thousands seperators.
   * The number is split into integer and decimal portions.
   * The formatted integer portion is concatenated with the decimal portion.
   * 
   * @param {*} number String operand
   * @returns Formatted number string.
   */
  getDisplayNumber(number) {
    const STRING_NUMBER = number.toString();
    const INTEGER_DIGITS = parseFloat(STRING_NUMBER.split('.')[0]);
    const DECIMAL_DIGITS = STRING_NUMBER.split('.')[1];
    let integerDisplay;

    // Format integer portion
    if (isNaN(INTEGER_DIGITS)) {
      integerDisplay = "";
    }
    else {
      // English locale string implements thousands seperator comma formatting.
      integerDisplay = INTEGER_DIGITS.toLocaleString("en", {maximumFractionDigits: 0})
    }

    // Connect decimal portion
    if (DECIMAL_DIGITS != null) {
      return `${integerDisplay}.${DECIMAL_DIGITS}`;
    }
    else {
      return integerDisplay;
    }
  }

  /**
   * Updates the display by setting the previous operand and current operand text.
   */
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

// Init Calculator
let calculator = new Calculator(PREVIOUS_OPERAND, CURRENT_OPERAND);