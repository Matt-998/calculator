function add(a, b) {
  return a + b;
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
      console.log(multiply(a, b));
      break;
    case "-":
      console.log(subtract(a, b));
      break;
    case "+":
      console.log(add(a, b));
      break;
    case "/":
      console.log(divide(a, b));
      break;
  }
}

let a = 100;
let b = 12;
let operator = "/";

operate(operator, a, b);
