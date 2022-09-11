/**
 * Fonctions liées aux intéractions du joueur
 */

/**
 * La touche préssée du clavier était-elle une lettre ?
 * @param {Object} evenement_clavier // Keyboard event
 * @returns {Boolean}
 */
 function est_lettre_pressee(evenement_clavier) {
    let code_ASCII = evenement_clavier.keyCode;

    return code_ASCII >= 65 && code_ASCII <= 90;
};

/**
 * Le joueur a-t-il cliqué sur un bouton ?
 * @param {Object} evenement_clic // Click event
 * @returns {Boolean}
 */
function est_bouton_clique(evenement_clic) {
    return evenement_clic.target.nodeName === "BUTTON";
};

/**
 * Le joueur a-t-il cliqué sur une lettre du clavier virtuel ?
 * @param {Object} evenement_clic // Click event
 * @returns {Boolean}
 */
function est_lettre_cliquee(evenement_clic) {
    return est_bouton_clique(evenement_clic) && /touche_[A-Z]/.test(id_element_clique(evenement_clic));
};

/**
 * La touche préssée du clavier était-elle la touche de suppression ?
 * @param {Object} evenement_clavier // Keyboard event
 * @returns {Boolean}
 */
function est_suppression_pressee(evenement_clavier) {
    let code_ASCII = evenement_clavier.keyCode;

    return code_ASCII === 8;
};

/**
 * Le joueur a-t-il cliqué sur la touche de suppression du clavier virtuel ?
 * @param {Object} evenement_clic // Click event
 * @returns {Boolean}
 */
function est_suppression_cliquee(evenement_clic) {
    let est_bouton_supprimer_clique = est_bouton_clique(evenement_clic) && id_element_clique(evenement_clic) === "touche_supprimer";
    let est_image_bouton_supprimer_clique = id_element_clique(evenement_clic) === "touche_supprimer--img";

    return est_bouton_supprimer_clique || est_image_bouton_supprimer_clique;
};

/**
 * La touche préssée du clavier était-elle la touche 'Entrée' ?
 * @param {Object} evenement_clavier // Keyboard event
 * @returns {Boolean}
 */
function est_validation_pressee(evenement_clavier) {
    let code_ASCII = evenement_clavier.keyCode;

    return code_ASCII === 13;
};

/**
 * Le joueur a-t-il cliqué sur la touche de validation du clavier virtuel ?
 * @param {Object} evenement_clic // Click event
 * @returns {Boolean}
 */
function est_validation_cliquee(evenement_clic) {
    let est_bouton_entrer_clique = est_bouton_clique(evenement_clic) && id_element_clique(evenement_clic) === "touche_entrer";
    let est_image_bouton_entrer_clique = id_element_clique(evenement_clic) === "touche_entrer--img";

    return est_bouton_entrer_clique || est_image_bouton_entrer_clique;
};
