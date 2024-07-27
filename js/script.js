// Seleção dos elementos
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')


// Lógica da calculadora
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }

    // Adiciona digitos para a tela da calculadora
    addDigit(digit){
        console.log(digit)
        
        // verificando se a operação ja contem um ponto
        if(digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return
        }
        this.currentOperation = digit
        this.updateScreen()
    }

    // Processa todas as operações da calculadora
    processOperation(operation) {

        // checar se o valor atual está vazio
        if(this.currentOperationText.innerText === '' && operation !== 'C') {

            // escolher operação
            if(this.previousOperationText !== '') {
                this.changeOperation(operation)
            }
            return
        }

        // Coleta o valor atual e o valor anterior
        let operationValue;
        let previous = +this.previousOperationText.innerText.split(' ')[0]
        let current = +this.currentOperationText.innerText

        switch (operation) {
            case '+':
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '-':
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '/':
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case '*':
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case 'DEL':
                this.processDelOperator()
                break;    
            case 'CE':
                this.processClearCurrentOperation()
                break;    
            case 'C':
                this.processClearAllOperation()
                break;  
            case '=':
                this.processEqualOperator()
                break;                                
            default:
                return;
        }
    }

    // Exibe valores na tela da calculadora
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {
        if(operationValue === null){
            // Adiciona o número para o valor atual
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // checar se o valor é 0, se for, apenas adicionar o valor atual
            if(previous === 0) {
                operationValue = current
            }

            //adicionando valor atual no valor anterior
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }  
    }
    
    // selecionando operação matemática
    changeOperation(operation) {
        const mathOperations = ['+', '-', '*', '/']
        if(!mathOperations.includes(operation)){
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }

    // Deletar o ultimo dígito
    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    }

    // Limpar a operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ''
    }

    // Limpar a operação atual e a anterior
    processClearAllOperation() {
        this.currentOperationText.innerText = ''
        this.previousOperationText.innerText = ''
    }

    // processar a operação
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(' ')[1]

        this.processOperation(operation)
    }
}

const calc = new Calculator(previousOperationText, currentOperationText)

//Eventos que farão a calculadora funcionar
buttons.forEach((btn) => { 
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText
        if(+value >= 0 || value === '.') {
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})