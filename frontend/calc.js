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
            display.value = "Error";
        }
    } else {
        display.value += value;
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (/[0-9+\-*/.=]/.test(key)) {
        ButtonClick(key);
    } else if (key === "Enter") {
        event.preventDefault();
        ButtonClick("=");
    }else if (key === "Delete") {
        ButtonClick("Del");
    } else if (key === "Escape") {
        ButtonClick("C");
    }
});




function calculate(userInput) {
    console.log(userInput,"input");
    const tokens = userInput.match(/[+\-*/]|\d+\.\d*|\d+/g);
    console.log(tokens);
    if (!tokens || tokens.length < 3) {
        throw new Error("Invalid expression");
    }

    let result = parseFloat(tokens[0]);
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const operand = parseFloat(tokens[i + 1]);

        if (isNaN(operand)) {
            throw new Error("Invalid expression");
        }

        switch (operator) {
            case "+":
                result += operand;
                break;
            case "-":
                result -= operand;
                break;
            case "*":
                result *= operand;
                break;
            case "/":
                if (operand !== 0) {
                    result /= operand;
                } else {
                    throw new Error("Division by zero");
                }
                break;
            default:
                throw new Error("Invalid operator");
        }    console.log(result,'finalresult');

    }
    localStorage.setItem(display.value,result);
    return result.toString();
}


