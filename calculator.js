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


digitsDOM.forEach(digit => digit.addEventListener('click', function (e) {
    let number = e.target.value;
    
    // populate the display of html div with string value of button
    if (!displayValue && displayDOM.textContent.length > 0  || displayDOM.textContent == "ERROR") {
        displayDOM.textContent = number;
        displayValue = number;
    } else {
        displayDOM.textContent += number;
        displayValue += number;
    }
    
    // store div display in displayValue variable
   
}));

operatorsDOM.forEach(operatorDOM => operatorDOM.addEventListener('click', function(e){
    
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

        operator = e.target.value;
    } else if (displayValue) {
        displayDOM.textContent = "";
        firstNum = parseFloat(displayValue);
        displayValue = "";

        operator = e.target.value;
    }
    
    
}));

equalsDOM.addEventListener('click', function() {
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
});

decimalDOM.addEventListener('click', function() {
    if (!displayDOM.textContent.includes('.')) {
        displayDOM.textContent += '.';
        displayValue += '.';
    }
});

clearDOM.addEventListener('click', clear);

delDOM.addEventListener('click', function() {
    if (displayDOM.textContent.length > 0) {
        displayDOM.textContent = displayDOM.textContent.slice(0, -1);
        displayValue = displayValue.slice(0, -1);
    }
});





