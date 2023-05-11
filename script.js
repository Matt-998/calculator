function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "*":
      mainDisplay.textContent =
        Math.round((multiply(a, b) + Number.EPSILON) * 100) / 100;
      operand1 = mainDisplay.textContent;
      break;
    case "-":
      mainDisplay.textContent =
        Math.round((subtract(a, b) + Number.EPSILON) * 100) / 100;
      operand1 = mainDisplay.textContent;
      break;
    case "+":
      mainDisplay.textContent =
        Math.round((add(a, b) + Number.EPSILON) * 100) / 100;
      operand1 = mainDisplay.textContent;
      break;
    case "/":
      let result = divide(a, b);
      if (result === Infinity) {
        mainDisplay.textContent = "Error";
      } else {
        mainDisplay.textContent =
          Math.round((result + Number.EPSILON) * 100) / 100;
        operand1 = mainDisplay.textContent;
      }
      break;
  }
}

let operator;
let operand1;
let operand2;
let self;
let equalCondition = false;
let clearCondition = false;
let decimalCondition = false;

const subDisplay = document.getElementById("subDisplay");
const digits = document.querySelectorAll("div.digit:not(#period)");
const operators = document.querySelectorAll("div.operator:not(#equals)");
const equals = document.getElementById("equals");
const mainDisplay = document.getElementById("display");
const ac = document.getElementById("fullClear");
const c = document.getElementById("clear");
const decimal = document.getElementById("period");

c.addEventListener("click", clear);
ac.addEventListener("click", allClear);
equals.addEventListener("click", equal);
for (operatorX of operators) {
  operatorX.addEventListener("click", addOperator);
}
for (const digit of digits) {
  digit.addEventListener("click", addDigit);
}
for (const digit of digits) {
  digit.addEventListener("keydown", addDigit);
}
decimal.addEventListener("click", addDecimal);
document.addEventListener("keydown", keyboardSupport);

function clear() {
  if (mainDisplay.textContent === "Error") {
    allClear();
  } else if (clearCondition === false && equalCondition === false) {
    let temp = subDisplay.textContent.split("");
    if (temp[temp.length - 1] === " ") {
      temp.splice(temp.length - 3, 3);
      subDisplay.textContent = temp.join("");
      operator = undefined;
      clearCondition = true;
    } else {
      temp = subDisplay.textContent.split(" ");
      temp.splice(temp.length - 1, 1, " ");
      subDisplay.textContent = temp.join(" ");
      clearCondition = true;
      decimalCondition = false;
    }
  }
}

function allClear() {
  operator = undefined;
  operand1 = undefined;
  operand2 = undefined;
  self = undefined;
  equalCondition = false;
  decimalCondition = false;
  mainDisplay.textContent = "0";
  subDisplay.textContent = "";
}

function equal() {
  let temp = subDisplay.textContent.split(" ");
  if (self === undefined) {
    operand2 = temp[temp.length - 1];
  }
  if (operand2 === "") {
    operand2 = operand1;
    self = operand1;
  }
  equalCondition = true;
  operate(operator, operand1, operand2);
}

function addOperator(key) {
  clearCondition = false;
  if (mainDisplay.textContent === "Error") {
    allClear();
  } else {
    if (operand1 === undefined) {
      operand1 = subDisplay.textContent;
    }
    let temp = subDisplay.textContent.split("");
    if (temp.length >= 1) {
      if (temp[temp.length - 1] !== " ") {
        if (operator !== undefined && equalCondition === false) {
          equal();
        }
        if (key.width === 1) {
          operator = this.getAttribute("data-value");
          equalCondition = false;
          decimalCondition = false;
          switch (operator) {
            case "*":
              subDisplayContent(" × ");
              break;
            case "-":
              subDisplayContent(" − ");
              break;
            case "+":
              subDisplayContent(" + ");
              break;
            case "/":
              subDisplayContent(" ÷ ");
              break;
          }
        } else {
          operator = key;
          equalCondition = false;
          decimalCondition = false;
          switch (key) {
            case "*":
              subDisplayContent(" × ");
              break;
            case "-":
              subDisplayContent(" − ");
              break;
            case "+":
              subDisplayContent(" + ");
              break;
            case "/":
              subDisplayContent(" ÷ ");
              break;
          }
        }
      }
    }
  }
}

function addDigit(key) {
  clearCondition = false;
  if (key.width === 1) {
    if (mainDisplay.textContent === "Error") {
      allClear();
    } else if (equalCondition === false) {
      subDisplayContent(this.getAttribute("data-value"));
    }
  } else if (equalCondition === false) {
    subDisplayContent(key);
  }
}

function addDecimal(key) {
  if (key.width === 1) {
    if (decimalCondition === false) {
      subDisplayContent(this.getAttribute("data-value"));
      decimalCondition = true;
    }
  } else if (decimalCondition === false) {
    subDisplayContent(key);
    decimalCondition = true;
  }
}

function subDisplayContent(text) {
  subDisplay.textContent = subDisplay.textContent + text;
}

function keyboardSupport(e) {
  switch (e.key) {
    case "+":
    case "-":
    case "/":
    case "*":
      addOperator(e.key);
      break;
    case "=":
      equal();
      break;
    case ".":
      addDecimal(e.key);
      break;
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
    case "0":
      addDigit(e.key);
      break;
  }
}
