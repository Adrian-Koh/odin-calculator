const display = document.querySelector('.display-text');
const buttonsContainer = document.querySelector('.buttons-container');
const displayButtons = document.querySelector('.display-buttons');

let a = NaN;
let b = NaN;
let operation;

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
    switch (target.className) {
        case 'number':
            if (Number.isNaN(a)) {
                a = +target.textContent;
            }
            else if (Number.isNaN(b)) {
                b = +target.textContent;
            }
            else {
                // a and b already 
            }

            break;
        case 'operator':
            if (operation !== undefined) {
                // throw error
            }
            switch (target.textContent) {
                case '+':
            }
            break;
        case 'equals':
            break;
    }

    display.textContent += target.textContent;
});

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

function backspace() {
    const displayText = display.textContent;
    display.textContent = displayText.split('').slice(0, displayText.length - 1).join('');
}