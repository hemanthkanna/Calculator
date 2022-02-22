const add = function(a,b) {
	return a + b;
};

const subtract = function(a,b) {
	return a - b;
};

const sum = function(array) {
	return array.reduce((totalValue, currentValue) => totalValue + currentValue , 0);
};

const multiply = function(array) {
  return (array.length) ?
  array.reduce((currentValue, nextValue) => 
  currentValue * nextValue) : 0 ;
};

const power = function(a,b) {
	return a ** b;
};

const factorial = function(n) {
  if(n === 0) {
    return 1;
} else {
    return  n * factorial(n - 1);
}
};

let expr = document.querySelector(".expr");
let ans = document.querySelector(".ans");
const button = document.querySelectorAll("button");

	button.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.className == 'operend' || 'operator') {
        expr.innerHTML =expr.innerHTML + btn.textContent;
      }
      if (btn.id == 'clear') {
        btn.addEventListener('click', clearScreen);
        }
    });
  });



const clearScreen = () => {
  expr.textContent = '';
  ans.textContent = '';
}

 
