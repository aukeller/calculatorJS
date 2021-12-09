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
const clearDOM = document.querySelector('#clear');


let displayValue = ""

let firstNum;
let secondNum;

let operatorVal = "";

let solution = 0

let operatorEngaged = false;

digitsDOM.forEach(digit => digit.addEventListener('click', function (e) {
    if (operatorEngaged == true) {
        displayDOM.textContent = "";
        displayValue = "";
    }
    // populate the display of html div with string value of button
    displayDOM.textContent += e.target.value;

    // store div display in displayValue variable
    displayValue += e.target.value;

}));


operatorsDOM.forEach(operator => operator.addEventListener('click', function(e) {
    operatorEngaged = true;
    // evaluate result if operator has value, first num has value, and displayvalue has value
    if (operatorVal.length > 0 && firstNum != undefined && displayValue.length > 0) {

        secondNum = parseInt(displayValue);
        solution = operate(operatorVal, firstNum, secondNum);
        
        displayDOM.textContent = `${solution}`;
        displayValue = solution;
        operatorVal = e.target.value;
    
        firstNum = solution;
        secondNum = undefined;

    } else {
        // stores the first number that is input into the calculator when a user presses an operator, in firstNum variable
        if (!firstNum) {
            firstNum = parseInt(displayValue);
        } else {
            secondNum = parseInt(displayValue);
        }
        // saves which operation has been chosen in operator variable
        operatorVal = e.target.value;
        // clears display div content and displayValue variable for next number
        displayDOM.textContent = "";
        displayValue = "";

    }

}));

equalsDOM.addEventListener('click', function() {

    // Grabs number that is on display when equals is pushed and stores it in secondNum variable
    secondNum = parseInt(displayValue);

    // calculates solution and stores in solution variable
    solution = operate(operatorVal, firstNum, secondNum);
    
    displayDOM.textContent = `${solution}`;
    displayValue = solution;
    operatorVal = "";

    firstNum = solution;
    secondNum = undefined;

})


