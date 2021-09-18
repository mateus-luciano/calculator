class Calculator {
    constructor() {
        this.previousOperandTextElement = document.getElementsByClassName('previous-operand')[0]
        this.currentOperandTextElement = document.getElementsByClassName('current-operand')[0]
        this.clear()
    }

    init() {
        this.assignEventNumberButtons()
        this.assignEventOperationButtons()
        this.assignEventEqualButton()
        this.assignEventClearButton()
        this.assignEventAllDeleteButtons()
    }

    assignEventNumberButtons() {
        document.querySelectorAll('.numbers').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault()
                this.appendNumber(button.innerHTML)
                this.populateDisplay()
            })
        })
    }

    assignEventOperationButtons() {
        document.querySelectorAll('.operation').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault()
                this.chooseOperation(button.innerHTML)
                this.populateDisplay()
            })
        })
    }

    assignEventAllDeleteButtons() {
        document.getElementsByClassName('equal')[0].addEventListener('click', event => {
            event.preventDefault()
            this.compute()
            this.populateDisplay()
        })
    }

    assignEventEqualButton() {
        document.getElementsByClassName('delete')[0].addEventListener('click', event => {
            event.preventDefault()
            this.clear()
            this.populateDisplay()
        })
    }

    assignEventClearButton() {
        document.getElementsByClassName('clean')[0].addEventListener('click', event => {
            event.preventDefault()
            this.delete()
            this.populateDisplay()
        })
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        // const floatNumber = parseFloat(number)
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        console.log(decimalDigits)
        // console.log(integerDigits)
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }

        // return floatNumber.toLocaleString('en')
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    populateDisplay() {
        this.currentOperandTextElement.innerHTML =
        this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandTextElement.innerHTML =
            `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerHTM = ''
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
}

export default new Calculator();
