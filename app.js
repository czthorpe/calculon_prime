let buttons = document.querySelectorAll('.row button');
let display = document.querySelector('.display')

let displayValue = '';
let numbers = [];
let operators = [];

buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
        parseInput(button.id);
        display.textContent = displayValue;
    })
})

function parseInput(input) {
    if (displayValue.length < 27) {
        if (parseInt(input) || input == '0') {
            displayValue += input;
        }
        else if (input == 'add') {
            displayValue += '+';
        }
        else if (input == 'subtract') {
            displayValue += '-';
        }
        else if (input == 'multiply') {
            displayValue += '*';
        }
        else if (input == 'divide') {
            displayValue += '/';
        }
        else if (input == 'point') {
            displayValue += '.';
        }
        else if (input == 'equals') {
            try {
                displayValue = evaluate();
            } catch (error) {
                displayValue = '';
            }
        }
    }
    if (input == 'clear') {
        clear();
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

    if (!parseInt(displayValue[displayValue.length - 1]) && displayValue[displayValue.length - 1] != '0') {
        return;
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
                return '¯\\_(ツ)_/¯';
            }
            total /= numbers[i + 1];
        }
    }
    if (total) {
        return total;
    }
    return '';

}

function operate(a, b, operator) {
    if (operator == '+') {
        return add(a, b);
    }
    if (operator == '-') {
        return subtract(a, b);
    }
    if (operator == '*') {
        return multiply(a, b);
    }
    if (operator == '/') {
        return divide(a, b);
    }

}

function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}