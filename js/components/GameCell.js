export default class GameCell extends HTMLElement {

    constructor(){
        //Recupere les proprietées et méthodes de la classe parent (HTMLElement)
        super();
        this.attachShadow({ mode:'open' });
        this.number = null;
        this.value = '';
    }

    connectedCallback() {
        this.render();
        const cell = this.shadowRoot.querySelector('.cell');
        cell.addEventListener('click', () => {
            this.handleClick();
        });
    }

    static get observedAttributes(){
        return ['number', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name == "number")
            this.number = parseInt(newValue);
        if(name == "value")
            /*Suite à updateCell de GameBoard ou on a changé la valeur de l'attribut value on met à jour la valeur this.value */
            this.value = newValue;

        /* On rappelle render() pour que visuellemnt la X s'affiche */   
        this.render();
    }

    handleClick(){
        const gameBoard = this.parentBoard;
        if(gameBoard){
            gameBoard.handleCellClick(this.number)
            //gameBoard.hadleCellClick(0)
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/style.css">
        <div class="cell">${this.value}</div>`;
    }
}