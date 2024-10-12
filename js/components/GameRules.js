export default class GameRules extends HTMLElement {

    constructor(){
        //Recupere les proprietées et méthodes de la classe parent (HTMLElement)
        super();
        this.attachShadow({ mode:'open' });
    }

    connectedCallback() {
        this.render();
        const buttonOpenGameHome = this.shadowRoot.getElementById('open-game-home');
        buttonOpenGameHome.addEventListener('click', () => { this.backToHome() } );
    }

    backToHome() {
        this.replaceWith(document.createElement('game-home'));
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="css/style.css">
        <div id="game-rules">
            <button id="open-game-home" class="btn"><i class="fa-solid fa-arrow-left"></i> Retour à l'accueil</button>
            <h1>Règles du Morpion</h1>
            <h2>Objectif du jeu</h2>
            <p>Le but du jeu est d'aligner trois de ses symboles (X ou O) sur une ligne, une colonne ou en diagonale avant l'adversaire.</p>

            <h2>Matériel nécessaire</h2>
            <ul>
                <li>Un plateau de jeu de 3x3 cases.</li>
                <li>Deux joueurs (un joue avec les X, l'autre avec les O).</li>
            </ul>

            <h2>Déroulement du jeu</h2>
            <ul>
                <li>Les joueurs décident qui commence en premier.</li>
                <li>Les joueurs jouent à tour de rôle pour placer leur symbole dans une case vide.</li>
                <li>Le premier joueur à aligner trois de ses symboles remporte la partie.</li>
                <li>Si toutes les cases sont remplies sans qu'un joueur ait gagné, la partie se termine par un match nul.</li>
            </ul>

            <h2>Conditions de victoire</h2>
            <p>Un joueur gagne s'il réussit à aligner trois de ses symboles :</p>
            <ul>
                <li>Horizontalement (sur une ligne).</li>
                <li>Verticalement (dans une colonne).</li>
                <li>Diagonale (de l'un des coins à l'autre).</li>
            </ul>

            <h2>Fin de la partie</h2>
            <p>La partie peut se terminer de trois manières :</p>
            <ul>
                <li>Un joueur gagne en alignant trois de ses symboles.</li>
                <li>La partie se termine par un match nul si toutes les cases sont remplies sans gagnant.</li>
                <li>Les joueurs peuvent choisir de recommencer une nouvelle partie.</li>
            </ul>
        </div>`;
    }
}