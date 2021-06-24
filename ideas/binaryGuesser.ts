/*
1. It'll call the getInput to get the user input value
2. GetInput output will be passed to isCorrect
3. isCorrect will call guessBinary and check if the input is equal to it
4. If it's true, increase the counter & currentBinary. Else, repeat.
*/

// A package to get the terminal input of the user
const promptUser = require("prompt-sync")()

let counter: number = 0
let currentBinary: string = "0"

// Function to guess the next number
const guessBinary = (): string => {
    const next: string = (counter + 1).toString(2)
    return next
}

// Function to get the input from the user
const getInput = (): void => {
    console.log(`\n Current Binary is ${currentBinary} \n`)
    const inputValue = promptUser("What's the next binary? ")
    isCorrect(inputValue)
}

// Function to check if the input is correct
const isCorrect = (inputValue: string | null): void => {
    if (inputValue === guessBinary()) {
        console.log("Correct Answer! \n")
        console.log(`Counter value was: ${counter}, Next Binary was: ${guessBinary()} \n`)
        counter += 1
        currentBinary = counter.toString(2)
        getInput()
    }
    else {
        console.log("Wrong Answer smol brain")
        console.log(`Counter value was: ${counter}, Next Binary was: ${guessBinary()} \n`)
    }
}

getInput()