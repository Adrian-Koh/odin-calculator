const display = document.querySelector('.display-text');
const buttons = document.querySelector('.buttons-container');

let a = NaN;
let b = NaN;
let operation;

buttons.addEventListener('click', (event) => {
    let target = event.target;
    let result;
    switch (target.class) {
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