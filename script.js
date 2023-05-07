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
      break;
    case "-":
      mainDisplay.textContent = subtract(a, b);
      break;
    case "+":
      mainDisplay.textContent = add(a, b);
      break;
    case "/":
      mainDisplay.textContent = divide(a, b);
      break;
  }
}

let operator;
let operand1;
let operand2;

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

equals.addEventListener("click", function () {
  let temp = subDisplay.textContent.split(" ");
  operand2 = temp[2];
  operate(operator, operand1, operand2);
});

for (operator of operators) {
  operator.addEventListener("click", function () {
    operator = this.getAttribute("data-value");
    operand1 = subDisplay.textContent;
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
