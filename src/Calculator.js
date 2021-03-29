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

    
    
    // getNumbers(numberString) {
    //     if (numberString !== '+' && numberString !== '-' && numberString !== '/' && numberString !== '*' && numberString !== ',' && numberString !== '.') {
    //         const number = Number.parseInt(numberString)
    //         this.calculate(number, null)
    //         this.populateDisplay(number)
    //     } else {
    //         this.calculate(null, numberString)
    //         this.populateDisplay(numberString)
    //     }
    // }


    // calculate(numb, func) {
    //     const number = [numb, ] 
    //     const funct = [, func]

    //     // const numbersArray = []

    //     // numbersArray.push(number)
        
    //     let result;

    //     // console.log(number[0])
        
    //     // let numbersArray = []
        
    //     let number1 = number
    //     let number2 = 0

    //     let numbersArray = []

    //     numbersArray.push(number1)

    //     console.log(numbersArray)
        
    //     console.log(number1[0], '1')
    //     console.log(number2, '2')
    //     // numbersArray.push(number)
        
    //     if (funct[1] == '-' || funct[1] == '+' || funct[1] == '/' || funct[1] == '*') {
    //         // console.log(numbersArray)
    //         // console.log('test')
    //         // console.log(funct[1])
    //         // number1 = numbersArray[0]
    //         // numbersArray = []
    //         // console.log(number1)
    //         number2 = number
    //         console.log(number1, '1')
    //         console.log(number2, '2')
    //         switch(funct) {
    //             case '+':
    //                 result = number1 + number2;
    //                 console.log(`${number1} + ${number2} = ${result}`)
    //                 break
    //             case '-':
    //                 result = number1 - number2;
    //                 console.log(`${number1} - ${number2} = ${result}`)
    //                 break
    //             case '*':
    //                 result = number1 * number2
    //                 console.log(`${number1} * ${number2} = ${result}`)
    //                 break;
    //             case '/':
    //                 result = number1 / number2;
    //                 console.log(`${number1} / ${number2} = ${result}`)
    //                 break
    //         }
    //     }
    // }

}

export default new Calculator();
