class CalcController {

    constructor() {
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = [];
        this._locale = "pt-BR";
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvent();
    }
    // Roda automaticamente ao iniciar o site
    initialize() {
        //chama a função que atualiza a data/hora
        this.setDisplayDateTime();
        //Função que atualiza a data e hora a cada segundo (1000ms = 1seg)
        setInterval(() => {
            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();
    }

    //Eventos dos Butoes /não é padrão
    addEventListenerAll(element, events, fn) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);
        });

    }
    // Apaga TODOS os dados da tela
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';
        this.setLastNumberToDisplay();
    }
    // Apaga ultima entrada
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();

    }
    //Pega a ultima Operação
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value) {

        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
        /*
        IndexOf(value) => retorna a posição do 'value' na array, se não encontrar retorna -1.
        Tem a mesma funcionalidade do codigo abaixo:
        if (['+', '-', '*', '%', '/'].indexOf(value) > -1) {
            return true;
        } else {
            return false;
        }
        
        */

    }

    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calc();

        }

    }

    getResult() {

        return eval(this._operation.join(""));
    }

    calc() {

        let last = '';

        //true is default, get the last operator
        this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        //calcula a operação quando tem 4 itens no array
        if (this._operation.length > 3) {
            last = this._operation.pop();

            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) { //Salva o ultimo numero do array para funções do botão igual

            this._lastNumber = this.getLastItem(false);
        }
        //
        let result = this.getResult();

        if (last == '%') {

            result /= 100;
            this._operation = [result];

        } else {
            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();

    }

    getLastItem(isOperator = true) {
        let lastItem;
        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.isOperator(this._operation[i]) == isOperator) {
                lastItem = this._operation[i];
                break;
            }
        }
        if(!lastItem) {

            lastItem = (isOperator) ? this._lastOperator: this._lastNumber;
        }

        return lastItem;
    }
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    // Adiciona nova entrada
    addOperation(value) {

        if (isNaN(this.getLastOperation())) { //Verifica se não é um numero True not a Number, False is a number

            if (this.isOperator(value)) {
                //Trocar o operador
                this.setLastOperation(value);

            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();


            }

        } else { //Quando é um numero o ultimo item do array
            if (this.isOperator(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                //atualizar display
                this.setLastNumberToDisplay();
            }


        }

    }
    // Mensagem de erro
    setError() {
        this.displayCalc = "Error";
    }
    addDot(){

        let lastOperation = this.getLastOperation();
        //Verifica se a ultima operação é uma String e se possui um '.'
        if (typeof lastOperation == 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if(this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }
    // executa os botões
    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;

            default:
                this.setError();
                break;
        }
    }

    //Função que escuta os eventos do Mouse
    initButtonsEvent() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        });

    }
    // Função que chama a data e hora
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',//Mostra o dia como 2 digitos
            month: 'short',//mostra o mês como escrito encurtado
            year: 'numeric'//mostra o ano como numerico
        });

        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }
    //Getter e Setter Mostrador da Hora
    get displayTime() {
        return this._timeEl.innerHTML;

    }
    set displayTime(value) {
        this._timeEl.innerHTML = value;

    }
    //Getter e Setter MOstrador da Data
    get displayDate() {
        return this._dateEl.innerHTML;

    }
    set displayDate(value) {
        this._dateEl.innerHTML = value;

    }
    // Getter e Setter Mostrador dos Numeros da Calculadora
    get displayCalc() {
        return this._displayCalcEl.innerHTML;

    }
    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value;

    }
    // Getter e Setter da Data-Hora
    get currentDate() {
        return new Date();

    }
    set currentDate(value) {
        this._currentDate = value;

    }
}