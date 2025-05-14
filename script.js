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
                    a = String(operate(operation, a, b));
                    b = '';
                    operation = clickedText;
                    display.textContent = a + clickedText;
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

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '/':
            return divide(a, b);
    }
}