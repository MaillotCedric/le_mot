/**
 * Fonctions liées aux différentes actions se déroulant dans le jeu
 */

/**
 * Sélectionner une case de la grille de jeu
 * La case sélectionnée est définie par sa position dans la grille
 * @param {Int} ligne Ligne sur laquelle se trouve la case
 * @param {Int} colonne Colonne sur laquelle se trouve la case
 */
function selectionner_case(ligne, colonne) {
    let case_grille = document.getElementById("case_" + ligne + colonne);

    ajouter_classe("selected", case_grille);
};

/**
 * Désélectionner une case de la grille de jeu
 * La case désélectionnée est définie par sa position dans la grille
 * @param {Int} ligne Ligne sur laquelle se trouve la case
 * @param {Int} colonne Colonne sur laquelle se trouve la case
 */
function deselectionner_case(ligne, colonne) {
    let case_grille = document.getElementById("case_" + ligne + colonne);

    supprimer_classe("selected", case_grille);
};

/**
 * Ajouter une lettre dans une case de la grille de jeu
 * La case sélectionnée est définie par sa position dans la grille
 * @param {Int} ligne Ligne sur laquelle se trouve la case
 * @param {Int} colonne Colonne sur laquelle se trouve la case
 * @param {String} lettre Lettre à placer dans la case
 */
function ajouter_dans_grille(ligne, colonne, lettre) {
    let container_lettre = document.querySelector("#case_"+ ligne +""+ colonne +" > .lettre");
    let html = "<span>"+ lettre +"</span>";

    inserer(html, container_lettre);
};

/**
 * Effacer le contenu d'une case de la grille de jeu
 * La case sélectionnée est définie par sa position dans la grille
 * @param {Int} ligne Ligne sur laquelle se trouve la case
 * @param {Int} colonne Colonne sur laquelle se trouve la case
 */
function effacer_case(ligne, colonne) {
    let container_lettre = document.querySelector("#case_"+ ligne +""+ colonne +" > .lettre");
    let html = "<span></span>";

    inserer(html, container_lettre);
};

/**
 * Intégrer la lettre au jeu
 * @param {String} lettre
 * @param {Object} jeu
 */
function integrer(lettre, jeu) {
    ajouter_dans_grille(jeu.position.ligne, jeu.position.colonne, lettre); // Ajouter la lettre dans la grille
    jeu.mot_propose = concatenee(jeu.mot_propose, lettre); // Actualiser le mot proposé en le concaténant avec la lettre
};

/**
 * Supprimer la lettre du jeu
 * @param {Object} jeu
 */
function supprimer_lettre(jeu) {
    effacer_case(jeu.position.ligne, jeu.position.colonne); // Supprimer la lettre dans la grille
    jeu.mot_propose = tronquee(jeu.mot_propose, 1); // Actualiser le mot proposé en le tronquant de sa dernière lettre
};

/**
 * Aller sur la prochaine case de la ligne en cours de jeu (sur laquelle on se trouve)
 * @param {Object} jeu
 */
function aller_prochaine_case_ligne(jeu) {
    deselectionner_case(jeu.position.ligne, jeu.position.colonne); // Désélectionner la case sur laquelle on se trouve
    jeu.position.colonne++; // Avancer d'une colonne dans la grille (et se retrouver sur une nouvelle case)
    selectionner_case(jeu.position.ligne, jeu.position.colonne); // Sélectionner la nouvelle case
};

/**
 * Aller sur la précédente case de la ligne en cours de jeu (sur laquelle on se trouve)
 * @param {Object} jeu
 */
function aller_precedente_case_ligne(jeu) {
    deselectionner_case(jeu.position.ligne, jeu.position.colonne); // Désélectionner la case sur laquelle on se trouve
    jeu.position.colonne--; // Reculer d'une colonne dans la grille (et se retrouver sur une nouvelle case)
    selectionner_case(jeu.position.ligne, jeu.position.colonne); // Sélectionner la nouvelle case
};

/**
 * On passe à la prochaine ligne de la grille de jeu
 * @param {Object} jeu
 */
function passer_ligne_suivante_grille(jeu) {
    jeu.position.ligne++;
    jeu.position.colonne = 1;
    selectionner_case(jeu.position.ligne, jeu.position.colonne);
};
