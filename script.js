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
    case "x":
      mainDisplay.textContent = multiply(a, b);
      operand1 = mainDisplay.textContent;
      break;
    case "-":
      mainDisplay.textContent = subtract(a, b);
      operand1 = mainDisplay.textContent;
      break;
    case "+":
      mainDisplay.textContent = add(a, b);
      operand1 = mainDisplay.textContent;
      break;
    case "/":
      mainDisplay.textContent = divide(a, b);
      operand1 = mainDisplay.textContent;
      break;
  }
}

let operator;
let operand1;
let operand2;
let self;

const subDisplay = document.getElementById("subDisplay");
const digits = document.querySelectorAll("div.digit");
const operators = document.querySelectorAll("div.operator:not(#equals)");
const equals = document.getElementById("equals");
const mainDisplay = document.getElementById("display");
const ac = document.getElementById("fullClear");
const c = document.getElementById("clear");

c.addEventListener("click", function () {
  if (operand2 === undefined) {
    operand1 = undefined;
  } else operand2 = undefined;
  subDisplay.textContent = "";
});

ac.addEventListener("click", function () {
  operator = undefined;
  operand1 = undefined;
  operand2 = undefined;
  mainDisplay.textContent = "0";
  subDisplay.textContent = "";
});

equals.addEventListener("click", equal);

function equal() {
  let temp = subDisplay.textContent.split(" ");
  if (self === undefined) {
    operand2 = temp[temp.length - 1];
  } else {
    operand2 = Number(operand2);
  }
  if (typeof operand2 != "number") {
    operand2 = operand1;
    self = operand1;
  }
  operate(operator, operand1, operand2);
}

for (operatorX of operators) {
  operatorX.addEventListener("click", function () {
    if (operator !== undefined) {
      equal();
    }
    operator = this.getAttribute("data-value");
    if (operand1 === undefined) {
      operand1 = subDisplay.textContent;
    }
    switch (operator) {
      case "x":
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
  });
}

for (const digit of digits) {
  digit.addEventListener("click", function () {
    subDisplayContent(this.getAttribute("data-value"));
  });
}

function subDisplayContent(text) {
  subDisplay.textContent = subDisplay.textContent + text;
}
