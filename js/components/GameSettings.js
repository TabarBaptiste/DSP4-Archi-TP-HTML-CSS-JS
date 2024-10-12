export default class GameSettings extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({ mode:'open' });
    }

    connectedCallback() {
        this.render();
        const buttonCloseGameSettings = this.shadowRoot.getElementById("close-game-settings");
        buttonCloseGameSettings.addEventListener("click", () => { this.closeGameSettings() });
        const buttonStartGame = this.shadowRoot.getElementById("ok");
        buttonStartGame.addEventListener("click", () => { this.startGame() })
    }

    startGame() {
        const pseudo = this.shadowRoot.getElementById('pseudo').value;
        const time = this.shadowRoot.getElementById('temps').value;
        const firstPlayer = this.shadowRoot.getElementById('first').value;

        if(pseudo.trim() == '' ){
            alert('Le pseudo est obligatoire !');
            return;
        }

        const gameBoard = document.createElement('game-board');
        
        gameBoard.setAttribute("pseudo", pseudo);
        gameBoard.setAttribute("time", time);
        gameBoard.setAttribute("first-player", firstPlayer);

        //Créer cela : <game-board pseudo="..." time="..." first-player="..." ></game-board>

        this.replaceWith(gameBoard);
    }

    closeGameSettings(){
        this.replaceWith(document.createElement('game-home'));
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/style.css">
        <div id="game-settings">
            <div class="popup">
                <button id="close-game-settings" class="btn">X</button>
                <header class="header-popup">
                    <h2>Jouer contre l'ordi</h2>
                </header>
                <div class="body-popup"> <!-- Conteneur principal pour le popup -->
                    <div>
                        <label>Pseudo</label> <!-- Label pour le champ de saisie du pseudo -->
                        <input type="text" id="pseudo"> <!-- Champ de saisie pour le pseudo -->
                    </div>
                    <div>
                        <label>Temps par tour</label> <!-- Label pour le menu déroulant du temps par tour -->
                        <select id="temps"> <!-- Menu déroulant pour choisir le temps par tour -->
                            <option value="15">15 sec</option> <!-- Option pour 15 secondes -->
                            <option value="30">30 sec</option> <!-- Option pour 30 secondes -->
                        </select>
                    </div>
                    <div>
                        <label>Qui joue en premier</label> <!-- Label pour le menu déroulant du joueur qui commence -->
                        <select id="first"> <!-- Menu déroulant pour choisir qui joue en premier -->
                            <option value="ordi">Ordi</option> <!-- Option pour l'ordinateur -->
                            <option value="joueur">Joueur</option> <!-- Option pour le joueur -->
                        </select>
                    </div>
                    <div>
                        <button class="btn full" id="ok">Valider</button>
                    </div>
                </div>
            </div>
        </div>`;
    }
}