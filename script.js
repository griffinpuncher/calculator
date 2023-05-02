document.addEventListener("DOMContentLoaded",function () {
    //variables
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const inputBox = document.getElementById("input-box");
    const regex = new RegExp("^\\d*(\\.?\\d*)?$");
    let valueOne = null;
    let valueTwo = null;
    let primedOperation = null;
    let secondPrimed = null;
    let evaluatedInput = "";
    let inputFocused = false;
    

    //event listeners
    numbers.forEach(number => {
        number.addEventListener("click", numberClick);
    })
    
    operators.forEach(operator => {
        operator.addEventListener("click", operatorClick);
    })
    
    inputBox.addEventListener("input", checkInput);
    inputBox.addEventListener("focus", () => inputFocused = true);

    document.getElementById("equals").addEventListener("click", () => {
        if(primedOperation && inputBox.value) {operate()}
    });

    document.addEventListener("keydown", event => {
        if(event.key === "Enter" && primedOperation && inputBox.value) {operate()}
        if(event.key === "+") {operatorPrime("add")}
        if(event.key === "-") {operatorPrime("subtract")}
        if(event.key === "x" || event.key === "*") {operatorPrime("multiply")}
        if(event.key === "/") {operatorPrime("divide")}
        if(event.key === "c") {clear()}
        if(event.key === "Backspace") {backspace()}
        if(!inputFocused) {
            inputBox.value += event.key;
            checkInput();
        }
        console.log(event.key);
    });

    document.getElementById("clear").addEventListener("click", clear);
    document.getElementById("backspace").addEventListener("click", backspace);

    //Functions
    function numberClick() {
        if((inputBox.value + this.textContent).match(regex)) {
            inputBox.value += this.textContent;
            evaluatedInput = inputBox.value;
        }
        else {
            console.log("oops!");
        }
    }

    function checkInput () {
        if(!inputBox.value.match(regex)) {
            inputBox.value = evaluatedInput;
        }
        else {
            evaluatedInput = inputBox.value;
        }
    }

    function operatorClick() {
        operatorPrime(this.id);
    }

    function operatorPrime (operation) {
        if(valueOne && primedOperation) {
            if(inputBox.value) {
                valueTwo = parseFloat(inputBox.value);
                secondPrimed = operation;
                operate();
            }
            else {
                primedOperation = operation;
            }
        }
        else {
            primedOperation = operation;
            valueOne = parseFloat(inputBox.value);
        }
        inputBox.value = "";
        checkInput();
    }

    function operate () {
        valueTwo = parseFloat(inputBox.value);
        if(primedOperation == "add") {add()}
        if(primedOperation == "subtract") {subtract()}
        if(primedOperation == "multiply") {multiply()}
        if(primedOperation == "divide") {divide()}
        valueTwo = null;
        primedOperation = secondPrimed;
        secondPrimed = null;
    }

    function add () {
        const answer = valueOne + valueTwo;
        inputBox.value = answer;
        valueOne = answer;
        checkInput();

    }
    function subtract () {
        const answer = valueOne-valueTwo;
        inputBox.value = answer;
        valueOne = answer;
        checkInput();

    }
    function multiply () {
        const answer = valueOne*valueTwo;
        inputBox.value = answer;
        valueOne = answer;
        checkInput();
    }
    function divide () {
        if(valueTwo == 0) {
            inputBox.value = "Fuck you!";
            valueOne = valueTwo = primedOperation = secondPrimed = null;
        }
        else {
            const answer = valueOne/valueTwo;
            inputBox.value = answer;
            valueOne = answer;
            checkInput();
        }
    }

    function clear () {
        valueOne = valueTwo = primedOperation = secondPrimed = null;
        inputBox.value = "";
        checkInput();
    }

    function backspace () {
        inputBox.value = inputBox.value.slice(0,-1);
        checkInput();
    }
});

/*
Pseudo code

FUNCTIONS:

numberClick:
adds the number clicked to the current Input. If there is already a decimal point clicking #decimal
will have no effect.
If the input box is full clicking numbers will be ignored.

checkInput:
If the input box is selected the input will evaluate if the end result of adding the character to
the string, and add the character if the end result matches regex.
If the input box is not selected the characters will be evaluated based on being placed on the end.

operatorClick: 
this will be initialized when a operator key is pressed. 
It will "lock in" the value currently in the input box.
When enter or the equals key is pressed and there is a valid input the corresponding function is called.
When another operator key is pressed
Optional: Will display the operation in the input box.

operate(val1,val2,operation):
Initialized by enter, #equals click, or an operator key/click.
Calls the function that corresponds to the primed operation

multiply/divide/subtract/add(val1,val2)

clear:
clears input, sets initial values to null

*/