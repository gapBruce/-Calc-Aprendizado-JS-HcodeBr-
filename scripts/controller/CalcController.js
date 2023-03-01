class CalcController {

    constructor() {

        this.operation = [];
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
    clearAll() {

    }
    clearEntry() {

    }

    execBtn(value) {

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':

                break;
            case 'subtracao':

                break;
            case 'divisao':

                break;
            case 'multiplicacao':

                break;
            case 'porcento':

                break;
            case 'soma':

                break;
        }
    }

    initButtonsEvent() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
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