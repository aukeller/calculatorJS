let displayValue = "";

let resultDisplayed = false;
let storedValues = [];
let storedOperations = [];


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
const operatorsDOM = document.querySelectorAll('button.operator');
const equalsDOM = document.querySelector('#equals');

function populateDisplay(e) {
    if (resultDisplayed) {
        displayDOM.textContent = "";
    }
    displayDOM.textContent += e.target.value;
    storeDisplayValue(e.target.value);
}

const storeDisplayValue = (value) => displayValue += value;

function storeValue() {
    storedValues.push(parseInt(displayValue));
    displayValue = "";
    displayDOM.textContent = "";
}

function evaluate() {
    let result = 0;
    let j = 0 // using as a second counter
    
    storeValue(); // needs to store value thats still on the display when equals is clicked

    for (let i = 0; i < storedValues.length; i += 2) {
        result += operate(storedOperations[j], storedValues[i], storedValues[i+1])
        j++;
    }

    displayDOM.textContent = `${result}`;
    resultDisplayed = true;

    storedValues = [];
    storedOperations = [];

}

digitsDOM.forEach(digit => digit.addEventListener('click', populateDisplay));

operatorsDOM.forEach(operator => operator.addEventListener('click', function(e) {
    storedOperations.push(e.target.value);
    storeValue();
}))

equalsDOM.addEventListener('click', evaluate);


// [12, 34, 21, 21]

// ['+', '-']
