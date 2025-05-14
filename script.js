const display = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const displayButtons = document.querySelector('.display-buttons');

let a = '';
let b = '';
let operation = '';

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
    let result;
    const clickedText = target.textContent;
    switch (target.className) {
        case 'number':
            // if operation is empty, append number to a
            if (!operation) {
                a += clickedText;
            }
            // if a and operation are assigned, append number to b
            if (a && operation) {
                b += clickedText;
            }
            display.textContent += clickedText;
            break;
        case 'operator':
            // if operation is assigned, compute the operation of a and b if they are assigned
            // if either a or b (or both) are unassigned, throw an error
            if (operation) {
                if (a && b) {
                    assignValues(clickedText);
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
                operation = clickedText;
                display.textContent += clickedText;
            }
            break;
        case 'equals':
            if (operation && a && b) {
                assignValues();
            }
            else {
                console.error('Operation entered is invalid');
            }
            break;
        case 'period':
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
            break;
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