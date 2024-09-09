let inputElement = document.getElementById("inputtedNumbers");
let errorOccurred = false;
let numberEntered = false;

// Function to append input (with switch-case)
function appendToInput(value) {
    if (errorOccurred) {
        clearInput();
        errorOccurred = false;
    }
    
    // Switch case for input type (numbers, operations, etc.)
    switch (value) {
        case '0': case '1': case '2': case '3': case '4':
        case '5': case '6': case '7': case '8': case '9':
        case '+': case '-': case '*': case '/': case '.':
            inputElement.textContent += value;
            numberEntered = true;
            break;
        case 'Enter': // Treat Enter as equals
            calculateResult();
            break;
        case 'Backspace': // Backspace key
            backspace();
            break;
        default:
            break;
    }

    enableDisableOperations();
}

// Function to clear input
function clearInput() {
    inputElement.textContent = "";
    errorOccurred = false;
    numberEntered = false;
    enableDisableOperations();
}

// Function to handle backspace
function backspace() {
    inputElement.textContent = inputElement.textContent.slice(0, -1);
    errorOccurred = false;
    enableDisableOperations();
}

// Function to calculate the result (with switch-case for error handling)
function calculateResult() {
    if (numberEntered) {
        try {
            let result = evaluateExpression(inputElement.textContent);
            inputElement.textContent = result;
            errorOccurred = false;
        } catch (error) {
            inputElement.textContent = "Error";
            errorOccurred = true;
        }
    }
}

// Function to evaluate expression
function evaluateExpression(expression) {
    let result;
    try {
        result = eval(expression); // Unsafe, but used for demonstration; prefer a parser
    } catch (error) {
        throw new Error("Invalid expression");
    }
    return result;
}

// Function to enable or disable operations based on input
function enableDisableOperations() {
    const operationButtons = document.querySelectorAll(".operations");
    operationButtons.forEach(button => {
        button.disabled = !numberEntered;
    });
}

// Keydown event listener for handling keyboard input
document.addEventListener("keydown", function(event) {
    const validKeys = "0123456789+-*/.";
    if (validKeys.includes(event.key)) {
        appendToInput(event.key);
    } else if (event.key === "Enter") {
        appendToInput("Enter");
    } else if (event.key === "Backspace") {
        appendToInput("Backspace");
    }
});

// Focus and blur event listeners for styling
inputElement.addEventListener("focus", function() {
    this.style.borderColor = "#0072c5";
});

inputElement.addEventListener("blur", function() {
    this.style.borderColor = "initial";
});