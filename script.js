const numberButtons = document.querySelectorAll('.number')
const operationButtons = document.querySelectorAll('.operation')
const equalsButton = document.querySelector('.equals')
const deleteButton = document.querySelector('.delete')
const clearButton = document.querySelector('.clear')
const negativeButton = document.querySelector('.negative')
const historyDisplay = document.querySelector('.history')
const currentDisplay = document.querySelector('.current-display')

let current = ''
let history = ''
let operation = ''

function clear() {
    current = ''
    history = ''
    operation = ''

}

function backspace() {
    current = current.slice(0, -1)
}

function appendNumber(number) {
    if (number === '.' && current.includes('.')) return
    if (number === '.') { current = '0' }
    current = current.toString() + number.toString()
}

function selectOperation(operator) {
    operation = operator
    history = history + current + operation.toString()
    current = ''
    updateDisplay()
    if (isNaN(history.slice(-1))){
    
    }
}

function calculate() {
    if (history == '') return
    history = history + current
    
    if (isNaN(history.slice(-1))) return
    current = eval(history)
    history = ''
    updateDisplay()
}

function updateDisplay() {
    currentDisplay.innerText = current
    historyDisplay.innerText = history
}



numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText)
        updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectOperation(button.innerText)
    })
})

clearButton.addEventListener("click", () => {
    clear()
    updateDisplay()
})

deleteButton.addEventListener("click", () => {
    backspace()
    updateDisplay()
})

equalsButton.addEventListener("click", () => {
    calculate()
})

