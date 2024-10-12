# Instructions pour le Jeu

## Instruction 1

Au clic sur **open-game-rules**, cela affiche la section **game-rules** et cache **game-home**.

## Instruction 2

Au clic sur **open-game-home**, cela affiche la section **game-home** et cache **game-rules**.

## Instruction 3

Au clic sur **jouer contre l'ordi**, cela affiche **game-settings** et au clic sur **close-game-settings**, cela cache **game-settings**.

## Instruction 4

Au clic sur **Valider** sur la popup **game-settings** :

- On récupère les valeurs des champs du formulaire.
- On teste si le pseudo est rempli.
- On initialise le premier joueur.
- On masque la popup et la page d'accueil.
- On affiche le plateau de jeu.

## Instruction 5

- On crée la grille.

## Instruction 6

- Gestion du clic sur la cellule : Récupérer l'ID de la cellule cliquée et en extraire uniquement le chiffre.  
  Exemple : Si l'ID est égale à **c1**, on récupère **1**.

## Instruction 7

- Enregistrer les coups de chaque joueur dans un tableau. Exemple :

## Instruction 8

- Création de la fonction checkingWinner : Vérifie si un joueur a réussi à aligner ses symboles sur le plateau de jeu. Elle parcourt chacune de ces conditions et vérifie si les cases correspondantes contiennent le même symbole (et ne sont pas vides), ce qui indiquerait qu'un joueur a gagné.
- La fonction switchPlayer change le joueur actif en alternant entre 'X' et 'O' à chaque appel. Cela permet de gérer le tour des joueurs, garantissant ainsi que chaque joueur puisse jouer à tour de rôle durant la partie.

## Instruction 9

Gestion du minuteur :

- La fonction startTimer initialise le minuteur en affichant le temps choisi par le joueur et en configurant une mise à jour toutes les secondes, réduisant le temps restant (tempsRestant) jusqu'à atteindre zéro. Si le temps s'écoule, un message d'alerte est affiché pour informer que c'est au tour de l'autre joueur, et la fonction switchPlayer est appelée pour changer de joueur.
- Dans la fonction switchPlayer : On arete le timer on change de joueur et on relance un nouveau timer
- A la fin du jeu on stop le timer

## Instruction 10
- Ajout du pseudo sur le haut de page
- Affiche le gagnant par son pseudo
