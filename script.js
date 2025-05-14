const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons-container');

buttons.addEventListener('click', (event) => {
    let target = event.target;
    display.textContent += target.textContent;
});
