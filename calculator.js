let displayValue = "";



function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    if (operator == '+') {
        return add(num1, num2);
    } else if (operator == "-") {
        return subtract(num1, num2);
    } else if (operator == "*") {
       return multiply(num1, num2);
    } else {
        return divide(num1, num2);
    }
}

const displayDOM = document.querySelector('.display');
const digitsDOM = document.querySelectorAll('button.digit');

function populateDisplay(e) {
    displayDOM.textContent += e.target.value;
    displayValue += e.target.value;
}

digitsDOM.forEach(digit => digit.addEventListener('click', populateDisplay));