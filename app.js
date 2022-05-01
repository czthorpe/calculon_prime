let buttons = document.querySelectorAll('.row button');
let display = document.querySelector('.display')

let displayValue = '';
let numbers = [];
let operators = [];
let shrug = '¯\\_(ツ)_ /¯';

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        parseInput(button.id);
        display.textContent = displayValue;
    })
})

function parseInput(input) {
    displayValue = displayValue.toString();
    if (displayValue == shrug) {
        displayValue = '';
    }
    if (displayValue.length < 27) {
        if (parseInt(input) || input == '0') {
            displayValue += input;
        }
        else if (input == 'add') {
            displayValue += ' + ';
        }
        else if (input == 'subtract') {
            displayValue += ' - ';
        }
        else if (input == 'multiply') {
            displayValue += ' * ';
        }
        else if (input == 'divide') {
            displayValue += ' / ';
        }
        else if (input == 'point') {
            displayValue += '.';
        }
    }
    if (input == 'clear') {
        clear();
    }
    else if (input == 'equals') {
        try {
            displayValue = evaluate();
        } catch (error) {
            displayValue = '';
        }
    }
}

function clear() {
    let display = document.querySelector('.display')
    displayValue = '';
    display.textContent = '';
}

function evaluate() {
    let tempString = '';
    numbers = [];
    operators = [];
    displayValue = displayValue.replace(/\s/g, "");

    if (!parseInt(displayValue[displayValue.length - 1]) && displayValue[displayValue.length - 1] != '0') {
        return '';
    }

    for (let i = 0; i < displayValue.length; i++) {
        if (parseInt(displayValue[i]) || displayValue[i] == '0') {
            tempString += displayValue[i];
            if (!(i <= displayValue.length - 2)) {
                numbers.push(parseFloat(tempString));
            }
        }
        else if (displayValue[i] == '.') {
            tempString += '.';
            if (!(i <= displayValue.length - 2)) {
                numbers.push(parseFloat(tempString));
            }
        }
        else {
            operators.push(displayValue[i]);
            numbers.push(parseFloat(tempString));
            tempString = '';
        }
    }
    console.log(numbers);
    console.log(operators);
    let total = numbers[0];
    for (let i = 0; i <= numbers.length - 1; i++) {
        if (operators[i] == '+') {
            total += numbers[i + 1];
        }
        else if (operators[i] == '-') {
            total -= numbers[i + 1];
        }
        else if (operators[i] == '*') {
            total *= numbers[i + 1];
        }
        else if (operators[i] == '/') {
            if (numbers[i + 1] == 0) {
                return shrug;
            }
            total /= numbers[i + 1];
        }
    }
    if (total || total == 0) {
        return +total.toFixed(4).toString();
    }
    return '';

}