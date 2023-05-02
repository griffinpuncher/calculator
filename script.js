document.addEventListener("DOMContentLoaded",function () {
    //variables
    const numbers = document.querySelectorAll(".number");
    const operators = document.querySelectorAll(".operator");
    const inputBox = document.getElementById("input-box");
    const regex = new RegExp("/^\d*(\.\d{0,1})?$/");
    let valueOne = null;
    let valueTwo = null;
    let primedOperation = null;
    let secondPrimed = null;
    

    //event listeners
    numbers.forEach(number => {
        number.addEventListener("click", numberClick);
    })
    
    operators.forEach(operator => {
        operator.addEventListener("click", operatorClick);
    })
    
    inputBox.addEventListener("input", numberType);

    document.getElementById("equals").addEventListener("click", () => {
        if(primedOperation && inputBox.value) {operate()}
    });

    document.addEventListener("keypress", event => {
        if(event.key === "Enter" && primedOperation && inputBox.value) {operate()}
        if(event.key === "+") {operatorPrime("add")}
        if(event.key === "-") {operatorPrime("subtract")}
        if(event.key === "x" || event.key === "*") {operatorPrime("multiply")}
        if(event.key === "/") {operatorPrime("divide")}
        if(event.key === "c") {clear()}
    });

    document.getElementById("clear").addEventListener("click", clear);

    //Functions
    function numberClick() {
        inputBox.value += this.textContent;
    }

    function numberType () {

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
        console.log(primedOperation);
        console.log(secondPrimed);
        console.log(valueOne);
        console.log(valueTwo);
        inputBox.value = "";
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
    }
    function subtract () {
        const answer = valueOne-valueTwo;
        inputBox.value = answer;
        valueOne = answer;
    }
    function multiply () {
        const answer = valueOne*valueTwo;
        inputBox.value = answer;
        valueOne = answer;
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
        }
    }

    function clear () {
        valueOne = valueTwo = primedOperation = secondPrimed = null;
        inputBox.value = "";
    }
});

/*
Pseudo code

FUNCTIONS:

numberClick:
adds the number clicked to the current Input. If there is already a decimal point clicking #decimal
will have no effect.
If the input box is full clicking numbers will be ignored.

numberType:
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