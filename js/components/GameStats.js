export default class GameStats extends HTMLElement {

    constructor() {
        //Recupere les proprietées et méthodes de la classe parent (HTMLElement)
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        const buttonOpenGameHome = this.shadowRoot.getElementById('open-game-home');
        buttonOpenGameHome.addEventListener('click', () => { this.backToHome() });
    }

    backToHome() {
        this.replaceWith(document.createElement('game-home'));
    }

    //* Affichage conventionnel
    render() {
        const stats = JSON.parse(localStorage.getItem('gameStats')) || {};

        let content = `
            <h2>Statistiques des joueurs</h2>
            <table>
                <thead>
                    <tr>
                        <th>Pseudo</th>
                        <th>Parties jouées</th>
                        <th>Victoires</th>
                        <th>Défaites</th>
                        <th>Matchs nuls</th>
                        <th>Pourcentage de Victoires</th>
                        <th>Nombre moyen de coups par partie</th>
                        <th>Temps moyen par coup (sec)</th>
                        <th>Meilleur temps pour gagner (sec)</th>
                        <th>Meilleure séquence de victoires</th>
                    </tr>
                </thead>
                <tbody>
        `;

        Object.keys(stats).forEach(pseudo => {
            const playerStats = stats[pseudo];

            content += `
                <tr>
                    <td class="nom">${pseudo}</td>
                    <td>${playerStats.gamesPlayed || 0}</td>
                    <td>${playerStats.wins || 0}</td>
                    <td>${playerStats.losses || 0}</td>
                    <td>${playerStats.draws || 0}</td>
                    <td>${playerStats.wins ? Math.round((playerStats.wins / playerStats.gamesPlayed) * 100) : 0}%</td>
                    <td>${(playerStats.totalMoves / playerStats.gamesPlayed).toFixed(2)}</td>
                    <td>${(playerStats.totalTime / playerStats.totalMoves).toFixed(2)}</td>
                    <td>${playerStats.bestTimeToWin !== null ? `${playerStats.bestTimeToWin}` : 'N/A'}</td>
                    <td>${playerStats.maxWinStreak || 0}</td>
                </tr>
            `;
        });

        content += `
                </tbody>
            </table>
        `;

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/style2.css">
            <div id="game-stats">
                <button id="open-game-home" class="btn">
                    <i class="fa-solid fa-arrow-left"></i> Retour à l'accueil
                </button>
                <div id="stats-container">
                    ${content}
                </div>
            </div>
        `;
    }

    //! Affichage personalisé
    // render() {
    //     const stats = JSON.parse(localStorage.getItem('gameStats')) || {};

    //     let content = '<h2>Statistiques des joueurs</h2>';
    //     Object.keys(stats).forEach(pseudo => {
    //         const playerStats = stats[pseudo];

    //         content += `
    //             <div>
    //                 <h3>${pseudo}</h3>
    //                 <table>
    //                     <tr><td>Parties jouées</td><td>${playerStats.gamesPlayed || 0}</td></tr>
    //                     <tr><td>Victoires</td><td>${playerStats.wins || 0}</td></tr>
    //                     <tr><td>Défaites</td><td>${playerStats.losses || 0}</td></tr>
    //                     <tr><td>Matchs nuls</td><td>${playerStats.draws || 0}</td></tr>
    //                     <tr><td>Pourcentage de victoires</td><td>${playerStats.wins ? Math.round((playerStats.wins / playerStats.gamesPlayed) * 100) : 0}%</td></tr>
    //                     <tr><td>Nombre moyen de coups par partie</td><td>${(playerStats.totalMoves / playerStats.gamesPlayed).toFixed(2)}</td></tr>
    //                     <tr><td>Temps moyen par coup</td><td>${(playerStats.totalTime / playerStats.totalMoves).toFixed(2)} secondes</td></tr>
    //                     <tr><td>Meilleur temps pour gagner une partie</td><td>${playerStats.bestTimeToWin !== null ? `${playerStats.bestTimeToWin} secondes` : 'N/A'}</td></tr>
    //                     <tr><td>Nombre de parties gagnées consécutivement</td><td>${playerStats.winStreak}</td></tr>
    //                     <tr><td>Meilleure série de victoires</td><td>${playerStats.maxWinStreak}</td></tr>
    //                 </table>
    //             </div>
    //         `;
    //     });

    //     this.shadowRoot.innerHTML = `
    //         <link rel="stylesheet" href="css/style.css">
    //         <div id="game-stats">
    //             <button id="open-game-home" class="btn"><i class="fa-solid fa-arrow-left"></i> Retour à l'accueil</button>
    //             <div id="stats-container">
    //                 ${content}
    //             </div>
    //         </div>
    //     `;
    // }
}