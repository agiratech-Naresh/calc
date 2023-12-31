const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button button");

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        ButtonClick(button.value);
    });
});

function ButtonClick(value) {   
    if (value === "C") {
        display.value = "";
    } else if (value === "Del") {
        display.value = display.value.slice(0, -1);
    } else if (value === "=") {
        try {
            display.value = calculate(display.value);
        } catch (error) {
            display.value = error;
        }
    } else {
        display.value += value;
    }
}


document.addEventListener("keyup", function (event) {
    const key = event.key;

    if (key === "Enter") {
        event.preventDefault();
        ButtonClick("=");
    } else if (key === "Delete") {
        ButtonClick("Del");
    } else if (key === "Escape") {
        ButtonClick("C");
    }
});


function calculate(userInput) {
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const tokens = userInput.match(/[+\-*/]|\d+\.\d*|\d+/g);
    
    if (tokens.length < 3) {
        throw new Error("Invalid expression");
    }

    const output = [];
    const operators = [];

    console.log('Tokens:', tokens);

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(parseFloat(token));
        } else {
            console.log('Current Token:', token);
            while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[token]) {
                let popSymbol=operators.pop();
                output.push(popSymbol);
            }
            operators.push(token);
        }
    });

    while (operators.length > 0) {
        let popSymbol=operators.pop();
        output.push(popSymbol);
    }

    console.log('Output (Postfix):', output);

    const stack = [];
    output.forEach(token => {
        if (typeof token === 'number') {
            stack.push(token);
        } else {
            console.log('Current Operator:', token);
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            console.log('Operands:', operand1, operand2);

            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    if (operand2 !== 0) {
                        stack.push(operand1 / operand2);
                    } else {
                        throw new Error("Division by zero");
                    }
                    break;
                default:
                    throw new Error("Invalid operator");
            }

        }
    });

    const result = stack.pop();
    localStorage.setItem(display.value, result);
    sessionStorage.setItem(display.value, result);

    return result.toString();
}
