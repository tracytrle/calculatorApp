let num1 = "";
let num2 = "";
let num3 = "";
let prevNum = "";
let operator = null;
let secondOperator = null;
let btnDot = 0;

let display = document.getElementById("display");

function calc(curOperator, number1, number2) {
  let result;
  if (curOperator === "add") {
    result = parseFloat(number1) + parseFloat(number2);
  } else if (curOperator === "minus") {
    result = parseFloat(number1) - parseFloat(number2);
  } else if (curOperator === "divide") {
    result = parseFloat(number1) / parseFloat(number2);
  } else if (curOperator === "multiply") {
    result = parseFloat(number1) * parseFloat(number2);
  }
  return result;
}

function addNumber(num) {
  if (!operator) {
    // handel multiple '.'
    if (num === "." && num1.includes(".")) {
      return;
    }
    num1 += num;

    prevNum = num1;
    display.innerHTML = num1;
  } else {
    if (operator && !secondOperator) {
      if (num === "." && num2.includes(".")) {
        return;
      }
      num2 += num;
      display.innerHTML = num2;
    } else {
      if (num === "." && num3.includes(".")) {
        return;
      }
      num3 += num;
      display.innerHTML = num3;
    }
  }
}

function setOperator(newOperator) {
  console.log("==========Test setOperator()");
  console.log("print first operator=" + operator);
  console.log("print first operator=" + operator);
  if (num1 === "") {
    num1 = prevNum;
    setOperator(newOperator);
  } else {
    if (!operator) {
      console.log("add first operator with no operand");
      operator = newOperator;
      displayOperator(operator);
      console.log(`num1=${num1}`);
      console.log(`operator=${operator}`);
      console.log(`num2=${num2}`);
      console.log(`SecondOperator=${secondOperator}`);
      console.log(`num2=${num3}`);
    } else if (operator && !secondOperator) {
      if (num2 === "") {
        console.log("repeat first ops with first ops is " + operator);
        operator = newOperator;
        displayOperator(operator);
        console.log("repeat first ops: last ops is = " + operator);

        console.log(`num1=${num1}`);
        console.log(`operator=${operator}`);
        console.log(`num2=${num2}`);
        console.log(`SecondOperator=${secondOperator}`);
        console.log(`num2=${num3}`);
      } else {
        // num2 && !second
        secondOperator = newOperator;
        displayOperator(secondOperator);

        console.log(`num1=${num1}`);
        console.log(`operator=${operator}`);
        console.log(`num2=${num2}`);
        console.log(`SecondOperator=${secondOperator}`);
        console.log(`num2=${num3}`);
      }
    } else if (secondOperator) {
      if (num3 === "") {
        console.log("repeat second ops with second ops is ");
        secondOperator = newOperator;
        displayOperator(secondOperator);
        console.log("repeat secondOp: last ops is = " + secondOperator);

        console.log(`num1=${num1}`);
        console.log(`operator=${operator}`);
        console.log(`num2=${num2}`);
        console.log(`SecondOperator=${secondOperator}`);
        console.log(`num2=${num3}`);
      } else {
        // calculate first step:
        if (
          operator === "divide" ||
          operator === "multiply" ||
          secondOperator === "add" ||
          secondOperator === "minus"
        ) {
          console.log("Calc first operator");
          num1 = calc(operator, num1, num2);
          num2 = num3;
          num3 = "";
          operator = secondOperator;
          secondOperator = null;
          displayOperator(operator);
          setOperator(newOperator);
        } else if (
          secondOperator === "divide" ||
          secondOperator === "multiply"
        ) {
          num2 = calc(secondOperator, num2, num3);
          num3 = "";
          secondOperator = null;
          setOperator(newOperator);
          // displayOperator(secondOperator);
          console.log("caseDivideorTime first operator=" + operator);
          console.log("caseDivideOrTime second operator=" + secondOperator);
        }
      }
    }
  }
  console.log("==========End Test setOperator()");
}

function displayOperator(operator) {
  if (operator === "add") {
    display.innerHTML = "+";
  } else if (operator === "minus") {
    display.innerHTML = "-";
  } else if (operator === "divide") {
    display.innerHTML = "/";
  } else if (operator === "multiply") {
    display.innerHTML = "x";
  }
}

function equal() {
  if ((operator && !secondOperator) || (secondOperator && num3 === "")) {
    num1 = calc(operator, num1, num2);
  } else if (operator && secondOperator) {
    if (
      operator === "multiple" ||
      operator === "divide" ||
      secondOperator === "add" ||
      secondOperator === "minus"
    ) {
      num1 = calc(operator, num1, num2);
      num2 = num3;
      num3 = "";
      operator = secondOperator;
      secondOperator = null;
      num1 = calc(operator, num1, num2);
      num2 = "";
      operator = null;
      display.innerHTML = num1;
    } else {
      num2 = calc(secondOperator, num2, num3);
      num3 = "";
      secondOperator = null;

      num1 = calc(operator, num1, num2);
      operator = null;
      num2 = "";
      console.log(` equal-btn ${num1}`);
      display.innerHTML = num1;
    }
  }
  display.innerHTML = num1;
  prevNum = num1;
  reset();
}
/*
function equal() {
  console.log("==========Test equal()");
  console.log(` equal operator ${operator}`);
  if ((operator && !secondOperator) || (secondOperator && num3 === "")) {
    num1 = calc(operator, num1, num2);
    display.innerHTML = num1;
    // prevNum = num1;
    num2 = "";
    operator = null;
    secondOperator = null;
  } else if (operator && secondOperator && num3 !== "") {
    if (
      operator === "multiple" ||
      operator === "divide" ||
      secondOperator === "add" ||
      secondOperator === "minus"
    ) {
      num1 = calc(operator, num1, num2);
      num2 = num3;
      num3 = "";
      operator = secondOperator;
      secondOperator = null;
      num1 = calc(operator, num1, num2);
      num2 = "";
      operator = null;
      display.innerHTML = num1;
    } else {
      num2 = calc(secondOperator, num2, num3);
      num3 = "";
      secondOperator = null;

      num1 = calc(operator, num1, num2);
      operator = null;
      num2 = "";
      console.log(` equal-btn ${num1}`);
      display.innerHTML = num1;
    }
    // prevNum = num1;
  }
  prevNum = num1;
  num1 = "";
  console.log(` end-num1 ${num1}`);
  console.log(` end-num2 ${num2}`);
  console.log(` end-operator ${operator}`);
  console.log("==========End Test Equal()");
}

*/

function clr() {
  num1 = "";
  num2 = "";
  operator = null;
  secondOperator = null;
  display.innerHTML = "";
}

function reset() {
  num1 = "";
  num2 = "";
  operator = null;
  secondOperator = null;
}

function del() {
  if (num3) {
    if (num3.length >= 1) {
      console.log(`num1 ${num3}`);
      num3 = num3.slice(0, -1);
    } else {
      num3 = "0";
    }
    display.innerHTML = num3;
  } else {
    if (num2) {
      if (num2.length >= 1) {
        num2 = num2.slice(0, -1);
      } else {
        num2 = "0";
      }
      display.innerHTML = num2;
    } else {
      if (num1) {
        if (num1.length >= 1) {
          num1 = num1.slice(0, -1);
        } else {
          num1 = "0";
        }
      }
      display.innerHTML = num1;
    }
  }
}
