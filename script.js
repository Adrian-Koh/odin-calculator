const display = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const displayButtons = document.querySelector('.display-buttons');

let a = '';
let b = '';
let operation = '';
let equalsHit = false;

displayButtons.addEventListener('click', (event) => {
    let target = event.target;
    switch (target.className) {
        case 'backspace':
            backspace();
            break;
        case 'clear':
            clear();
            break;
    }
});

buttonsContainer.addEventListener('click', (event) => {
    let target = event.target;
    const clickedText = target.textContent;
    switch (target.className) {
        case 'number':
            appendDigit(clickedText);
            break;
        case 'operator':
            appendOperator(clickedText);
            break;
        case 'equals':
            handleEquals();
            break;
        case 'period':
            appendPeriod();
            break;
    }
});

const DIGITS = '0123456789';
const OPERATORS = '+-*/'
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (DIGITS.includes(key)) {
        appendDigit(key);
    }
    else if (OPERATORS.includes(key)) {
        appendOperator(key);
    }
    else if (key === '=' || key === 'Enter') {
        handleEquals();
    }
    else if (key === '.') {
        appendPeriod();
    }
    else if (key === 'Backspace') {
        backspace();
    }
    else if (key === 'Escape') {
        clear();
    }
});

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function backspace() {
    const displayText = display.textContent;
    display.textContent = displayText.split('').slice(0, displayText.length - 1).join('');
}

function clear() {
    display.textContent = '';
    a = '';
    b = '';
    operation = '';
}

function appendDigit(digit) {
    // if operation is empty, append number to a
    if (!operation) {
        if (equalsHit) {
            a = digit;
            equalsHit = false;
            display.textContent = '';
        }
        else {
            a += digit;
        }
    }
    // if a and operation are assigned, append number to b
    if (a && operation) {
        b += digit;
    }
    display.textContent += digit;
}

function appendOperator(op) {
    // if operation is assigned, compute the operation of a and b if they are assigned
    // if either a or b (or both) are unassigned, throw an error
    if (operation) {
        if (a && b) {
            assignValues(op);
        }
        else {
            console.error('Cannot perform operation without valid numbers');
            return;
        }
    }
    else {  // if a is unassigned and an operator is clicked on, throw an error
        if (!a) {
            console.error('Cannot perform operation without number before operator');
            return;
        }
        operation = op;
        display.textContent += op;
    }
}

function handleEquals() {
    if (operation && a && b) {
        assignValues();
        equalsHit = true;
    }
    else {
        console.error('Operation entered is invalid: ' + display.textContent);
    }
}

function appendPeriod() {
    if (!a) {
        a = '0.';
        display.textContent = a;
    }
    else if (operation && !b) {
        b = '0.';
        display.textContent += b;
    }
    else if (a && !operation) {
        if (a.includes('.')) {
            console.error('Cannot enter period, current number is already a decimal');
        }
        else {
            a += '.';
            display.textContent += '.';
        }
    }
    else if (a && operation && b) {
        if (b.includes('.')) {
            console.error('Cannot enter period, current number is already a decimal');
        }
        else {
            b += '.';
            display.textContent += '.';
        }
    }
}

function assignValues(op = '') {
    a = operate(operation, a, b);
    if (Number.isNaN(a)) {
        clear();
        return;
    }
    a = String(a);
    b = '';
    
    operation = op;
    display.textContent = a + op;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case 'x':
            result = multiply(a, b);
            break;
        case '/':
            if (b === 0) {
                alert('Invalid operation: division by zero');
                return NaN;
            }
            result = divide(a, b);
            break;
    }

    if (Number.isInteger(result)) {
        return result;
    }

    // remove trailing zeros
    result = result.toFixed(5);
    let i = result.length - 1;
    while (i >= 0 && result[i] == '0') {
        i--;
    }
    return result.split('').slice(0, i + 1).join('');
}