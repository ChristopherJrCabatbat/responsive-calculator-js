let inputElement = document.getElementById("inputtedNumbers");
let errorOccurred = false;
let numberEntered = false;

// Function to append input (without using Enter for anything except calculation)
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

// Function to calculate the result (only if the input is valid)
function calculateResult() {
    // Ensure that the input doesn't end with an operator before calculation
    if (numberEntered && !/[\+\-\*\/\.]$/.test(inputElement.textContent)) {
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
        result = eval(expression); // Use eval for basic calculation
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
    const validKeys = "0123456789+-*/."; // Valid keys that are allowed for input
    if (validKeys.includes(event.key)) {
        appendToInput(event.key); // Only handle actual input keys
    } else if (event.key === "Enter") {
        event.preventDefault(); // Prevent default behavior of Enter key
        calculateResult();  // Only perform calculation on Enter, no appending
    } else if (event.key === "Backspace") {
        appendToInput("Backspace"); // Handle backspace for removal of last character
    }
});

// Focus and blur event listeners for styling
inputElement.addEventListener("focus", function() {
    this.style.borderColor = "#0072c5";
});

inputElement.addEventListener("blur", function() {
    this.style.borderColor = "initial";
});