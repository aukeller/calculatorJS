function add(num1, num2) {
    return Math.round((num1 + num2) * 100) / 100;
}

function subtract(num1, num2) {
    return Math.round((num1 - num2) * 100) / 100;
}

function multiply(num1, num2) {
    return Math.round((num1 * num2) * 100) / 100;
}

function divide(num1, num2) {
    return Math.round((num1 / num2) * 100) / 100;
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
const clearDOM = document.querySelector('#clear');
const decimalDOM = document.querySelector("#decimal");
const delDOM = document.querySelector('#del');


let displayValue = ""

let firstNum;
let operator = "";


function clear() {
    displayDOM.textContent = "";
    displayValue = "";
    firstNum = undefined;
    operator = "";
}

function dividingByZero() {
    if (operator == "/" && displayValue == 0) {
        return true;
    }
}

function displayDigit(e) {
    let number;
    if (typeof e === 'string') {
        number = e;
    } else {
        number = e.target.value;
    }
    
    // populate the display of html div with string value of button
    if (!displayValue && displayDOM.textContent.length > 0  || displayDOM.textContent == "ERROR") {
        displayDOM.textContent = number;
        displayValue = number;
    } else {
        displayDOM.textContent += number;
        displayValue += number;
    }
}

function useOperator(e) {
    let operSign;
    if (typeof e === 'string') {
        operSign = e;
    } else {
        operSign = e.target.value;
    }
    if (firstNum && operator && displayValue) {
        if (dividingByZero() == true) {
            clear();
            displayDOM.textContent = "ERROR"
            return;
        }

        let result = operate(operator, firstNum, parseFloat(displayValue));
        
        displayDOM.textContent = result.toString();
        displayValue = "";
        firstNum = result;

        operator = operSign;
    } else if (displayValue) {
        displayDOM.textContent = "";
        firstNum = parseFloat(displayValue);
        displayValue = "";

        operator = operSign;
    }
}

function calculate() {
    if (dividingByZero() == true) {
        clear();
        displayDOM.textContent = "ERROR"
        return;
    }

    if (firstNum && displayValue && operator) {
        let result = operate(operator, firstNum, parseFloat(displayValue));
        displayDOM.textContent = result;
        displayValue = result.toString();
    
        firstNum = undefined;
        
        operator = "";
    }
}

function displayDecimal() {
    if (!displayDOM.textContent.includes('.')) {
        displayDOM.textContent += '.';
        displayValue += '.';
    }
}

function del() {
    if (displayDOM.textContent.length > 0) {
        displayDOM.textContent = displayDOM.textContent.slice(0, -1);
        displayValue = displayValue.slice(0, -1);
    }
}


digitsDOM.forEach(digit => digit.addEventListener('click', displayDigit));

operatorsDOM.forEach(operatorDOM => operatorDOM.addEventListener('click', useOperator));

equalsDOM.addEventListener('click', calculate);

decimalDOM.addEventListener('click', displayDecimal);

clearDOM.addEventListener('click', clear);

delDOM.addEventListener('click', del);



window.addEventListener('keydown', (e) => {
    const digits = "1234567890";
    const operators = "+-/*"
    
    if (digits.includes(e.key)) {
        displayDigit(e.key);
    } else if (operators.includes(e.key)) {
        useOperator(e.key);
    } else if (e.key == "Enter") {
        calculate();
    } else if (e.key == ".") {
        displayDecimal();
    } else if (e.key == "c") {
        clear();
    } else if (e.key == "Backspace"){
        del();
    }
});

