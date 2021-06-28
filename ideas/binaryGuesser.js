/*
1. It'll call the getInput to get the user input value
2. GetInput output will be passed to isCorrect
3. isCorrect will call guessBinary and check if the input is equal to it
4. If it's true, increase the counter & currentBinary. Else, repeat.
*/
// A package to get the terminal input of the user
var promptUser = require("prompt-sync")();
var counter = 0;
var currentBinary = "0";
// Function to guess the next number
var guessBinary = function (counterValue) {
    var next = (counterValue + 1).toString(2);
    return next;
};
var getInput = function () {
    console.log("\n Current Binary is " + currentBinary + " \n");
    var inputValue = promptUser("What's the next binary? ");
    isCorrect(inputValue);
};
var isCorrect = function (inputValue) {
    if (inputValue === guessBinary()) {
        console.log("Correct Answer! \n");
        console.log("Counter value was: " + counter + ", Next Binary was: " + guessBinary() + " \n");
        counter += 1;
        currentBinary = counter.toString(2);
        getInput();
    }
    else {
        console.log("Wrong Answer smol brain");
        console.log("Counter value was: " + counter + ", Next Binary was: " + guessBinary() + " \n");
    }
};
getInput();

module.exports = {
    guessBinary,
    isCorrect,
    getInput
}