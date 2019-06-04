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
    updateDisplay()
}

function backspace() {
    current = current.slice(0, -1)
    updateDisplay()
}

function appendNumber(number) {
    if (number === '.' && current == '') { current = '0' }
    if (number === '.' && current.includes('.')) return

    current = current.toString() + number.toString()
    updateDisplay()
}

function selectOperation(operator) {
    operation = operator
    history = history + current + operation.toString()
    current = ''
    updateDisplay()

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
        
    })
})

document.addEventListener("keydown" , e => {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || e.key == '.' || (e.keyCode >= 96 && e.keyCode <= 105)) { 
        appendNumber(e.key)
    }
    
    if (e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') { 
        selectOperation(e.key)
    }

    if (e.key == '=') {
        calculate()
    }
    
    if (e.key == 'Backspace') {
        backspace()
    }

 
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isNaN(history.slice(-1))) {
            history = history.slice(0, -1)
            selectOperation(button.innerText)
        } else {
            selectOperation(button.innerText)
        }
    })
})

clearButton.addEventListener("click", () => {
    clear()
})

deleteButton.addEventListener("click", () => {
    backspace()
})

equalsButton.addEventListener("click", () => {
    calculate()
})

