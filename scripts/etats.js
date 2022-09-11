/**
 * Fonctions liées à l'état du jeu
 */

/**
 * Le bord droit de la grille de jeu a-t-il été atteint ?
 * @param {Object} jeu
 * @returns {Boolean}
 */
function bord_droit_grille_atteint(jeu) {
    return jeu.position.colonne === jeu.nombre_lettres;
};

/**
 * Le bord gauche de la grille de jeu a-t-il été atteint ?
 * @param {Object} jeu
 * @returns {Boolean}
 */
function bord_gauche_grille_atteint(jeu) {
    return jeu.position.colonne === 1;
};

/**
 * La dernière ligne de la grille de jeu a-t-elle été atteinte ?
 * @param {Object} jeu
 * @returns {Boolean}
 */
function derniere_ligne_grille_atteinte(jeu) {
    return jeu.position.ligne === jeu.nombre_tentatives;
};

/**
 * La dernière case de la ligne en cours de jeu (sur laquelle on se trouve) est-elle remplie ?
 * @param {Object} jeu
 * @returns {Boolean}
 */
function derniere_case_ligne_en_cours_remplie(jeu) {
    return longueur(jeu.mot_propose) === jeu.nombre_lettres;
};

// TODO Mettre en place la logique de vérification
/**
 * Le mot proposé existe-t-il ?
 * @param {String} mot_propose
 * @returns {Boolean}
 * @example
 * // returns true
 * existe("avion");
 * @example
 * // returns false
 * existe("aaabb");
 */
function existe(mot_propose) {
    return true;
};

/**
 * Le mot proposé dans le jeu par le joueur est-il correct ?
 * @param {String} mot_propose
 * @returns {Boolean}
 */
function est_correct_mot_propose(jeu) {
    return minuscule(jeu.mot_propose) === minuscule(jeu.mot_a_trouver);
};

/**
 * Le jeu est-il terminé ?
 * @param {Object} jeu
 * @returns {Boolean}
 */
function en_cours(jeu) {
    return !jeu.est_termine;
};
