let display = document.getElementById('display');

function appendNumber(number) {
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else {
        display.value += number;
    }
}

function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/', '%'].includes(lastChar)) {
        display.value = display.value.slice(0, -1) + operator;
    } else {
        display.value += operator;
    }
}

function clearDisplay() {
    display.value = '0';
}

function deleteLast() {
    if (display.value.length === 1 || display.value === 'Error') {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        if (display.value === '' || display.value === '0') {
            return;
        }
        let result = eval(display.value);
        
        if (!isFinite(result)) {
            display.value = 'Error';
            return;
        }
        
        // Round to reasonable decimal places
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(10));
        }
        
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendNumber('.');
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});

