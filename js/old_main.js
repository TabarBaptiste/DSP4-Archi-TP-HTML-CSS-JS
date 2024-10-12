let gameRules = document.getElementById('game-rules');
let gameHome = document.getElementById('game-home');
let gameSettings = document.getElementById('game-settings');
let game = document.getElementById('game');
let plateau = document.getElementById('plateau');
let player1Time = document.getElementById('player-1-time');
let player2Time = document.getElementById('player-2-time');
let player1Pseudo = document.getElementById('player-1-pseudo');

let buttonOpenGameRules = document.getElementById('open-game-rules');
let buttonOpenGameHome = document.getElementById('open-game-home');
let buttonOpenGameSettings = document.getElementById('open-game-settings');
let buttonCloseGameSettings = document.getElementById('close-game-settings');
let buttonOk = document.getElementById('ok');

let pseudo, temps, first;
let currentPlayer = 'X';
let etatPlateau = ['','','','','','','','',''];
let tempsRestant;
let timer;

function openGameRules(){
    gameRules.style.display = 'block';
    gameHome.style.display = 'none';
}
function openGameHome(){
    gameRules.style.display = 'none';
    gameHome.style.display = 'block';
}
function openGame(){
    gameHome.style.display = 'none';
    game.style.display = 'block';
}
function openGameSettings(){
    gameSettings.style.display = 'block';
}
function closeGameSettings(){
    gameSettings.style.display = 'none';
}
function closeGame(){
    game.style.display = 'none';
}

function startTimer(){
    tempsRestant = temps;
    
    editTimeForplayers(); //Mettre à jour l'affichage du minuteur pour chaque joueur

    timer = setInterval( () => {
        if(tempsRestant > 0){
            tempsRestant--;
            editTimeForplayers();
        }else{
            alert("Temps écoulé ! C'est au tour de l'autre joueur.");
            switchPlayer();
        }
    } , 1000);

}

function editTimeForplayers(){
    if(currentPlayer == 'X'){
        player1Time.textContent = `00:${tempsRestant}`;
        player2Time.textContent = `00:00`;
    }else{
        player1Time.textContent = `00:00`;
        player2Time.textContent = `00:${tempsRestant}`;
    }
}



function checkingWinner(){
    let combinaisonsGagnantes = [
        [0,1,2],
        [0,3,6],
        [6,7,8],
        [2,5,8],
        [0,4,8],
        [2,4,6],
        [1,4,7],
        [3,4,5],
    ];

    for (let combinaison of combinaisonsGagnantes) {
        let [a, b, c] = combinaison;
        if(etatPlateau[a] && etatPlateau[a] == etatPlateau[b] &&  etatPlateau[a] == etatPlateau[c]){
            let winner = (etatPlateau[a] == 'X') ? pseudo : 'Ordi'
            alert(`Le joueur ${winner} a gagné`);
            endGame();
            return;
        }
    }
    if(!etatPlateau.includes("")){
        alert('Egalité');
        endGame();
        return;
    }
}

function resetGame(){
    etatPlateau = ['','','','','','','','',''];
}

function endGame(){
    stopTimer();
    resetGame();
    openGameHome();
    closeGame();
}

function stopTimer(){
    clearInterval(timer)
}

function switchPlayer() {
    stopTimer();
    if(currentPlayer == 'X'){
        currentPlayer = 'O';
    }else{
        currentPlayer = 'X';
    }
    startTimer();
}
function cellClick(event){
    let clickedCell = event.target;
    let clickedCellId = clickedCell.id;
    let clickedCellIndex = parseInt(clickedCellId.substring(1));

    /* Si la case cliquée est déjà occupée par un X ou O */
    if(etatPlateau[clickedCellIndex] != ''){
        return;
    }

    /* Met à jour le contenu texte de l'élément de la cellule cliquée (clickedCell). Elle remplace le texte actuel de cette cellule par le symbole du joueur actuel, qui peut être 'X' ou 'O', indiquant ainsi le mouvement effectué par le joueur. Cela permet à l'utilisateur de visualiser immédiatement quel symbole a été placé dans la case, rendant l'état du jeu clair et interactif. */
    clickedCell.textContent = currentPlayer;
    //Met à jour l'état du plateau, qui représente le plateau de jeu. Elle assigne la valeur de currentPlayer (qui peut être 'X' ou 'O') à l'index spécifié par clickedCellIndex, indiquant ainsi que cette case a été occupée par le joueur actuel. Cela modifie le tableau pour refléter le coup effectué et permet au jeu de suivre les mouvements des joueurs et de déterminer les conditions de victoire
    etatPlateau[clickedCellIndex] = currentPlayer;
    
    checkingWinner();
    switchPlayer();
}

function createPlateau(){
    plateau.innerHTML = ''; //Annuler toutes les div pour la deuxieme 'partie'
    for (let index = 0; index < 9; index++) {
        /*Création d'une cellule (cell) :

        let cell = document.createElement('div'); : À chaque itération de la boucle, cette ligne crée un nouvel élément <div> dans le DOM (Document Object Model).
        document.createElement('div') appelle la méthode createElement de l'objet document, qui génère un nouvel élément HTML de type <div>. Cela est utilisé pour représenter une case sur le plateau de jeu du morpion. */

        let cell = document.createElement('div');
        cell.id = "c" + ( index);
        cell.addEventListener('click', cellClick);
        /*
        Ajout de la cellule au plateau :

        plateau.appendChild(cell); : Cette ligne ajoute la nouvelle cellule (cell) à un élément parent appelé plateau.
        plateau doit être une référence à un élément du DOM (par exemple, une <div> qui sert de conteneur pour le plateau de jeu). La méthode appendChild ajoute cell à la fin de la liste des enfants de plateau.
        Cela signifie que chaque fois qu'une nouvelle cellule est créée, elle est ajoutée au plateau, ce qui construit progressivement la grille du jeu. */
        plateau.appendChild(cell)
    }
}

function startGame(){
    pseudo = document.getElementById('pseudo').value;
    first = document.getElementById('first').value;
    temps = document.getElementById('temps').value;

    if(pseudo == '' ){
        alert('Le pseudo est obligatoire');
        return;
    }
    // Initialiser le joueur actuel en fonction du choix sur le formulaire
    if(first == "ordi"){
        currentPlayer = 'O';
    }
    
    player1Pseudo.textContent = pseudo;
    
    closeGameSettings();
    openGame();
    createPlateau();
    startTimer();
}

buttonOpenGameRules.addEventListener('click', openGameRules);

buttonOpenGameHome.addEventListener('click', openGameHome);

buttonOpenGameSettings.addEventListener('click', openGameSettings);

buttonCloseGameSettings.addEventListener('click', closeGameSettings);

buttonOk.addEventListener('click', startGame);