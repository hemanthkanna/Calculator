const numberButtons = document.querySelectorAll('.operend');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalsButton = document.getElementById('equals');
const exprDisplay = document.getElementById('expr');
const resultDisplay = document.getElementById('ans');

let displayValue1 = '';
let displayValue2 = '';
let tempValue1 = 0;
let tempValue2 = 0;
let lastOperator = '';
let tempResult = 0;
let result = 0;
let haveDot = false;

// function to add numbers
function add(num1 , num2){
  tempResult = num1 + num2;
}
// function to sub numbers
function sub(num1, num2) {
  tempResult = num1 - num2;
}
// function to multiply numbers
function multiply(num1, num2) {
  tempResult = num1 * num2;
}
// function to divide numbers
function division(num1, num2) {
  tempResult = num1 / num2;
}
// function to divide numbers and returns remainder
function modulo(num1, num2) {
  tempResult = num1 % num2;
}
  
// function to run operation after getting input values
function operate(lastOperator,tempValue1,tempValue2) {
  switch (lastOperator) {
    case '+':
      add(tempValue1, tempValue2);
      updateDisplay();
      break;
    case '-':
      sub(tempValue1, tempValue2);
      updateDisplay();
      break;
    case '*':
      multiply(tempValue1, tempValue2);
      updateDisplay();
      break;
    case '/':
      if (tempValue1 == 0 || tempValue2 == 0 && lastOperator == '/') {
        clearAll();
        alert("Yoc Cannot Divide By Zero");
      } else {
        division(tempValue1, tempValue2);
        updateDisplay();
      }
      break;
    case '%':   
      if (tempValue2 == 0 && lastOperator == '%') {
        clearAll();
        alert("Yoc Cannot Divide By Zero");
      } else {
        modulo(tempValue1, tempValue2);
        updateDisplay(); 
      } 
      break;
    default:
      alert('ERROR - INVALID');
      break;
  }
}

// function to get input values
function getInputNumbers() {
  numberButtons.forEach(numbers => {
    numbers.addEventListener('click', (e) => {
      if (e.target.innerText === '.' && !haveDot) {         
        haveDot = true;
      } else if (e.target.innerText === '.' && haveDot) {
        return;
      }
  
      if (lastOperator && tempValue1) {
        displayValue2 += e.target.innerText;
        tempValue2 = parseFloat(displayValue2);   
      }
      displayValue1 += e.target.innerText;          
      exprDisplay.innerText = displayValue1;    
    })
  })
}

// function to get the operation to be performed
function getOperation() {
  operatorButtons.forEach(operation => {
    operation.addEventListener('click', (e) => {
      if(!displayValue1) return;  

      if (tempValue1 && tempValue2 && lastOperator) {
        operate(lastOperator,tempValue1,tempValue2); 
        if (!tempValue1 == 0) {
          lastOperator = e.target.innerText;
          displayValue1 = result + lastOperator;
          exprDisplay.innerText = displayValue1;
        } else {
          clearAll();
          resultDisplay.innerText = '0';
        }

      } else if (exprDisplay.innerText.slice(-1) == ('+' || '-' || '*' || '/' || '%')) {
          return;
        } else {
          haveDot = false;
          lastOperator = operation.getAttribute('value');
          tempValue1 = parseFloat(displayValue1);
          displayValue1 += lastOperator; 
          exprDisplay.innerText = displayValue1;
        }
    })
  })
}


// performs the operation when '=' sign clicked
equalsButton.addEventListener('click', (e) => {
  operate(lastOperator,tempValue1,tempValue2); 
  displayValue1 = result ;
  exprDisplay.innerText = displayValue1;
} );

clearButton.addEventListener('click', clearAll);
deleteButton.addEventListener('click', deleteElement);

// function to update display and values
function updateDisplay() {
  result = roundResult(tempResult);
  resultDisplay.innerText = result;
  tempValue1 = result;
  tempValue2 = 0;   
  displayValue2 = '';
  haveDot = false;       
}

// function to clear all values and displayScreen
function clearAll() {
  displayValue1 = '';
  displayValue2 = '';
  tempValue1 = 0;
  tempValue2 = 0;
  tempResult = 0;
  result = 0;
  exprDisplay.innerText = '';
  resultDisplay.innerText = '';
}

// function to delete last element
function deleteElement() {
  if (tempValue1 && lastOperator && tempValue2) {
    exprDisplay.innerText = exprDisplay.innerText.slice(0, -1);
    displayValue1 = exprDisplay.innerText;
    tempValue2 = tempValue2.toString().slice(0, -1);
    tempValue2 = parseFloat(tempValue2);
  } else if(exprDisplay.innerText.slice(-1) == lastOperator){
    exprDisplay.innerText = exprDisplay.innerText.slice(0, -1);
    displayValue1 = exprDisplay.innerText;
    lastOperator = '';
    displayValue2 = 0;
  } else {
    exprDisplay.innerText = exprDisplay.innerText.slice(0, -1);
    displayValue1 = exprDisplay.innerText;
  }
}

// function to round the result value
function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function runCalculator() {
  getInputNumbers();
  getOperation();
}

runCalculator();
