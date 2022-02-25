const allButtons = document.querySelectorAll('button');
const operendButtons = document.querySelectorAll('.operend');
const operatorButtons = document.querySelectorAll('.operator');
const exprDisplay = document.getElementById('expr');
const resultDisplay = document.getElementById('ans');
const deleteValue = document.getElementById('delete');
const clear = document.getElementById('clear');
const equalsButton = document.getElementById('equals');

let displayValue = '';
let displayValue2 = '';
let operator = '';
let haveDot = false;
let tempValue1 = 0;
let tempValue2 = 0;
let tempResult = 0;
let result = 0;


operendButtons.forEach(numbers => {
  numbers.addEventListener('click', (e) => {             
    if (e.target.innerText === '.' && !haveDot) {
      haveDot = true;
    } else if (e.target.innerText === '.' && haveDot) {
      return;
    }

    if (operator && tempValue1) {
      displayValue2 =  displayValue2 + e.target.innerText;
      tempValue2 = parseFloat(displayValue2);   
    }
    displayValue = displayValue + e.target.innerText;          
    exprDisplay.innerText = displayValue;                         
  })
});

operatorButtons.forEach(operation => {
  operation.addEventListener('click', (e) => {    
    if(!displayValue) {
      return;     
    } 
    if (tempValue1 && tempValue2 && operator) {     
      evaluate();
      if (!tempValue1 == 0) {
        haveDot = false;
        operator = e.target.innerText;                
        displayValue +=  ' ' + operator;                       
        exprDisplay.innerText = displayValue;
      } else {
        clearAll();
      }

    } else {
      haveDot = false;
      operator = e.target.innerText;                    
      tempValue1 = parseFloat(displayValue);           
      displayValue = displayValue +' '+operator;         
      exprDisplay.innerText = displayValue;              
      console.log("temp1 = " + tempValue1);
      console.log("display1 = " + displayValue);
    }
  })
});

clear.addEventListener('click', clearAll);
deleteValue.addEventListener('click', deleteElement);
equalsButton.addEventListener('click', evaluate);

function evaluate() {
  switch (operator) {
    case '+':
      add();     
      break;
    case '-':
      sub();
      break;
    case '*':
      multiply();
      break;
    case '/':
      division();
      break;
    case '%':
      modulo();
      break;
    default: 
      "error";
      break;
  }
}

function add() {
  tempResult = (tempValue1 + tempValue2);
  result = roundResult(tempResult);
  valueReset();
}

function sub() {
  tempResult = (tempValue1 - tempValue2);
  result = roundResult(tempResult);      
  valueReset();
}

function multiply() {
  tempResult = (tempValue1 * tempValue2);
  result = roundResult(tempResult);
  valueReset();
}

function division() {
  tempResult = (tempValue1 / tempValue2);
  result = roundResult(tempResult);
  valueReset();
}

function modulo() {
  tempResult = (tempValue1 % tempValue2);
  result = roundResult(tempResult);
  valueReset(); 
}


function clearAll() {
  displayValue = '';
  displayValue2 = '';
  tempValue1 = 0;
  tempValue2 = 0;
  tempResult = 0;
  result = 0;
  exprDisplay.innerText = '';
  resultDisplay.innerText = '';
}

function valueReset() {
  displayValue = result;                          
  displayValue2 = '';                                   
  tempValue1 = tempResult;                               
  tempValue2 = null;                                     
  resultDisplay.innerText = result;
  haveDot = false;
}

function deleteElement() {
    if (tempValue1 && operator && tempValue2) {
      exprDisplay.innerText = exprDisplay.innerText.slice(0, -1);
      displayValue = exprDisplay.innerText;
      tempValue2 = tempValue2.toString().slice(0, -1);
      tempValue2 = parseFloat(tempValue2);
    } else {
      exprDisplay.innerText = exprDisplay.innerText.slice(0, -1);
      displayValue = exprDisplay.innerText;
    }
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}