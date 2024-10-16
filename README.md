# Implémentation de statistiques avancées dans le Morpion

### 1. Création du fichier `GameStats.js`

J’ai créé un fichier `GameStats.js` qui me sert de class pour gérer l’affichage des statistiques sous forme de tableau.

- **La méthode `connectedCallback()`** appelle la méthode `render()` pour afficher les statistiques, et configure un bouton pour retourner à l'écran d'accueil du jeu en écoutant l'événement click.

- **La méthode `render()`** récupère les données des statistiques stockées dans `localStorage` et les affiche sous forme de tableau pour chaque joueur, avec des informations comme :
    - Nombre de parties jouées
    - Victoires, défaites et égalités
    - Pourcentage de victoires
    - Nombre moyen de coups
    - Temps moyen par coup
    - Meilleur temps pour gagner une partie
    - Série de victoires consécutives
``` javascript
        if (this.currentPlayer === 'X') {
            player1Pseudo.classList.add('active-player');
            player2Pseudo.classList.remove('active-player');
        } else {
            player1Pseudo.classList.remove('active-player');
            player2Pseudo.classList.add('active-player');
        }
```
### 2. Modification de la fonction `endGame()` dans GameBoard.js

Dans GameBoard.js, la fonction `endGame()` a été mise à jour pour inclure la gestion et la mise à jour des statistiques de jeu dans le `localStorage` :

**a. Récupération des statistiques** : 
- Les statistiques précédemment stockées dans `localStorage` sont récupérées et parsées avec `JSON.parse()`. Si aucune statistique n'est trouvée, un objet vide est utilisé comme valeur par défaut.

**b.Mise à jour des statistiques du joueur courant** :

- Les statistiques du joueur courant (ici 'X') sont récupérées ou initialisées avec des valeurs par défaut (parties jouées, victoires, défaites, égalités, etc.).
- Le nombre de parties jouées est incrémenté à chaque fin de partie.
- Le nombre total de coups joués est également mis à jour en fonction du nombre de tours effectués.

**c. Vérification du gagnant** :

- Si la fonction `checkingWinner()` détecte un gagnant, les statistiques du joueur gagnant sont mises à jour : le nombre de victoires, la série de victoires consécutives, et le meilleur temps pour gagner une partie (le cas échéant).

- Si la partie est une égalité (aucun gagnant et plus de cases vides), les égalités sont incrémentées.

**d. Calcul des statistiques**

- Le nombre moyen de coups par partie est calculé en divisant le total des coups par le nombre de parties jouées.

- Le temps moyen par coup est calculé en divisant le temps total par le nombre total de coups. Cependant, dans ce cas, les valeurs de temps moyen par coup seront toujours très faibles, proches de zéro, car :

    - Les parties sont généralement jouées en moins de deux secondes par tour.

    - Le robot joue beaucoup trop vite, ce qui fausse le calcul du temps par coup en le rendant extrêmement faible.

- Le meilleur temps pour gagner est mis à jour si un nouveau meilleur temps est enregistré.

### 3. Test avec des données par défaut

Avant de récupérer les données réelles depuis le `localStorage`, des tests ont été effectués avec des valeurs par défaut pour s'assurer que la gestion des statistiques fonctionne correctement. Ces valeurs par défaut ont été ajoutées au `localStorage` comme suit :

En résumé, j'ai créé le fichier `GameStats.js` pour gérer et afficher les statistiques des joueurs, et j'ai modifié la fonction `endGame()` dans GameBoard.js pour mettre à jour ces statistiques à chaque fin de partie. Les données sont stockées dans `localStorage` et affichées dans un tableau.

# Exercice

### 1. Mise en évidence du joueur actif

Le nom du joueur pour qui c'est le tour est stylé dynamiquement pour qu'il se démarque visuellement.

- La méthode `switchPlayer()` gère le changement de joueur. Lorsqu'un joueur termine son tour, la classe CSS `active-player` est appliquée au pseudo du joueur courant.

- Cette classe est utilisée pour styliser le texte du joueur actif avec un effet visuel particulier

- Exemple dans `switchPlayer()` :

### 2. Historique des coups joués

Un suivi des mouvements effectués par chaque joueur est enregistré et affiché.

Fonctionnement :

- Chaque mouvement est enregistré dans un tableau `history` à chaque fois qu'un joueur joue une case. Cette action est gérée par la méthode `logMove()`.
```javascript
    logMove(player, index) {
        this.turn++;
        const move = {
            turn: this.turn,
            player: this.players[player].name,
            position: index
        };
        this.history.push(move);
        this.updateHistory();
    }
```
- Chaque élément enregistré contient :

    - Le tour en cours (this.turn).

    - Le nom du joueur qui a joué.

    - La position où le joueur a joué (index de la cellule).

- Ensuite, la méthode `updatehistory()` met à jour l'interface pour afficher la liste des mouvements dans l'élément `<ul id="moves-list">`

- Chaque mouvement est ajouté en tant qu'élément `<li>`
``` javascript
    updateHistory() {
        const movesList = this.shadowRoot.getElementById('moves-list');
        movesList.innerHTML = ''; // On vide la liste pour la mettre à jour

        this.history.forEach((move) => {
            const li = document.createElement('li');
            li.textContent = `Tour ${move.turn} : ${move.player} a joué à la position ${move.position}`;
            movesList.appendChild(li);
        });
    }
```
