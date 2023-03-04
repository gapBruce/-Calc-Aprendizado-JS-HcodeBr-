class CalcController {

    constructor() {

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
    }
    // Apaga ultima entrada
    clearEntry() {
        this._operation.pop();
    }
    //Pega a ultima Operação
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    setLastOperation(value){

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

    pushOperation(value){

        this._operation.push(value);
        if (this._operation.length > 3){

            let last = this._operation.pop;
            console.log(this._operation);

        } 

    }
    // Adiciona nova entrada
    addOperation(value) {

        if (isNaN(this.getLastOperation())) { //Verifica se não é um numero True not a Number, False is a number

            if (this.isOperator(value)) {
                //Trocar o operador
                this.setLastOperation(value);

            } else if(isNaN(value)) {
                //Outras coisas
                
                console.log('Console ELSE IF ', value);

            }else {

                this.pushOperation(value);

            }

        } else { //Quando é um numero o ultimo item do array
            if (this.isOperator(value)){

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

            }

            
        }


    }
    // Mensagem de erro
    setError() {
        this.displayCalc = "Error";
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

                break;
            case 'ponto':
                this.addOperation('.');
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