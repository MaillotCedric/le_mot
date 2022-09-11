/**
 * Créer la grille de jeu (définie par sa hauteur et sa largeur)
 * @param {Int} hauteur
 * @param {Int} largeur
 */
function creer_grille(hauteur, largeur) {
    let grille = document.getElementById("grille");
    let html = "";

    for (let ligne = 1; ligne <= hauteur; ligne++) {
        html += `<div class="tentative">`;
        for (let colonne = 1; colonne <= largeur; colonne++) {
            html += `
                <div id="case_`+ ligne + colonne +`" class="lettre_container">
                    <div class="lettre">
                        <span></span>
                    </div>
                </div>
            `;
        };
        html += `</div>`;
    };

    inserer(html, grille);
};

/**
 * Lancer la mécanique d'ajout de la lettre dans le jeu
 * Mécanique d'ajout :
 * . intégration de la lettre dans la partie graphique et la partie logique du jeu
 * . gestion du déplacement sur la ligne en cours de jeu (sur laquelle on se trouve)
 * @param {String} lettre
 * @param {Object} jeu
 */
function lancer_mecanique_ajout(lettre, jeu) {
    if (!bord_droit_grille_atteint(jeu)) { // Si le joueur ne se trouve pas sur la dernière case de la ligne
        integrer(lettre, jeu); // Intégrer la lettre au jeu
        aller_prochaine_case_ligne(jeu); // Aller sur la prochaine case de la ligne en cours de jeu (sur laquelle on se trouve)
    } else { // Le joueur se trouve sur la dernière case de la ligne
        if (!derniere_case_ligne_en_cours_remplie(jeu)) { // La dernière case est vide
            integrer(lettre, jeu); // Intégrer la lettre au jeu
            deselectionner_case(jeu.position.ligne, jeu.position.colonne);
        };
    };
};

/**
 * Lancer la mécanique de suppression de la lettre dans le jeu
 * Mécanique de suppression :
 * . suppression de la lettre dans la partie graphique et la partie logique du jeu
 * . gestion du déplacement sur la ligne en cours de jeu (sur laquelle on se trouve)
 * @param {Object} jeu
 */
function lancer_mecanique_suppression_lettre(jeu) {
    if (derniere_case_ligne_en_cours_remplie(jeu)) { // La dernière case de la ligne en cours de jeu (sur laquelle on se trouve) n'est pas vide
        supprimer_lettre(jeu); // Supprimer la lettre du jeu
        selectionner_case(jeu.position.ligne, jeu.position.colonne);
    } else if (!bord_gauche_grille_atteint(jeu)) { // Le joueur ne se trouve pas sur la première case de la ligne
        aller_precedente_case_ligne(jeu); // Aller sur la précédente case de la ligne en cours de jeu (sur laquelle on se trouve)
        supprimer_lettre(jeu); // Supprimer la lettre du jeu
    };
};

/**
 * Lancer la mécanique de validation du mot proposé par le joueur dans le jeu
 * Mécanique de validation du mot proposé :
 * . vérifier que le mot proposé est complet
 * . vérifier que le mot proposé existe
 * . vérifier si le mot proposé est correct ou pas
 * . lancer la mécanique de révélation des lettres de la ligne en cours de jeu (sur laquelle on se trouve)
 * . gérer les interactions avec le joueur (suivant l'action réalisé par le joueur, afficher le feedback adéquat)
 * . gérer les sauts de ligne dans la grille de jeu
 * . gérer la fin de partie
 * @param {Object} jeu
 */
function lancer_mecanique_validation_mot_propose(jeu) {
    if (!derniere_case_ligne_en_cours_remplie(jeu)) { // La dernière case de la ligne en cours de jeu (sur laquelle on se trouve) est vide <=> le mot proposé n'est pas complet
        alert("Veuillez entrer un mot de "+ jeu.nombre_lettres +" lettres");
    } else if (!existe(jeu.mot_propose)) {
        alert(jeu.mot_propose + " n'existe pas !");
    } else { // Le mot proposé est complet et il existe
        if (est_correct_mot_propose(jeu)) {
            reveler_lettres_ligne_en_cours(jeu);
            reveler_lettres_clavier(jeu);
            jeu.est_termine = true; // Le jeu est terminé
            alert("Vous avez gagné !");
        } else { // Le mot proposé est incorrect
            reveler_lettres_ligne_en_cours(jeu);
            reveler_lettres_clavier(jeu);
            if (derniere_ligne_grille_atteinte(jeu)) { // C'est la dernière tentative
                alert("Vous avez perdu !");
                jeu.est_termine = true; // Le jeu est terminé
            } else { // Il nous reste des vies
                passer_ligne_suivante_grille(jeu);
                jeu.mot_propose = ""; // Le mot proposé est réinitialisé
            };
        };
    };
};

/**
 * Attribuer à chaque lettre présente sur la ligne en cours de jeu (sur laquelle on se trouve), la couleur correspondante à son état de validité
 * @param {Object} jeu
 */
function reveler_lettres_ligne_en_cours(jeu) {
    let minuscule_mot_propose = minuscule(jeu.mot_propose);
    let minuscule_mot_a_trouver = minuscule(jeu.mot_a_trouver);
    let chaine_reference = est_correct_mot_propose(jeu) ? chaine(jeu.nombre_lettres, "V") : resultat_comparaison(minuscule_mot_propose, minuscule_mot_a_trouver);

    caracteres(chaine_reference).forEach((caractere, index) => {
        let numero_colonne = index + 1;
        let case_grille = document.getElementById("case_" + jeu.position.ligne + numero_colonne);
        if (caractere === "V") {
            ajouter_classe("correct", case_grille);
        } else if (caractere === "O") {
            ajouter_classe("partiel", case_grille);
        } else { // caractere === "_"
            ajouter_classe("incorrect", case_grille);
        };
    });
};

/**
 * Attribuer à chaque lettre du clavier la couleur correspondante à son état de validité
 * @param {Object} jeu
 */
function reveler_lettres_clavier(jeu) {
    let minuscule_mot_propose = minuscule(jeu.mot_propose);
    let minuscule_mot_a_trouver = minuscule(jeu.mot_a_trouver);
    let chaine_reference = est_correct_mot_propose(jeu) ? chaine(jeu.nombre_lettres, "V") : resultat_comparaison(minuscule_mot_propose, minuscule_mot_a_trouver);

    caracteres(chaine_reference).forEach((caractere, index) => {
        let lettre_proposee = jeu.mot_propose[index];
        let touche_clavier = document.getElementById("touche_" + majuscule(lettre_proposee));
        
        // La classe "deja_proposee", permet de savoir si l'état de validité d'une lettre n'a pas changé et évite ainsi de lui réattribuer une couleur qu'elle possède déjà
        if (caractere === "V" && !possede_classe(touche_clavier, "deja_proposee")) { // La lettres est bonne, bien placée et n'a jamais été proposée
            ajouter_classe("correct", touche_clavier);
            ajouter_classe("deja_proposee", touche_clavier);
        } else if (caractere === "V") { // La lettres est bonne, bien placée et a déjà été proposée (la lettre passe de l'orange au vert)
            ajouter_classe("correct", touche_clavier);
        } else if (caractere === "O" && !possede_classe(touche_clavier, "deja_proposee")) { // La lettres est bonne, mal placée et n'a jamais été proposée
            ajouter_classe("partiel", touche_clavier);
            ajouter_classe("deja_proposee", touche_clavier);
        } else if (caractere === "_" && !possede_classe(touche_clavier, "deja_proposee")) { // La lettres est incorrecte et n'a jamais été proposée
            ajouter_classe("incorrect", touche_clavier);
            ajouter_classe("deja_proposee", touche_clavier);
        };
    });
};

/* ------------------------------- Main ------------------------------- */

let jeu = {
    "nombre_tentatives": 5,
    "nombre_lettres": 5,
    "position": {
        "ligne": 1,
        "colonne": 1
    },
    "numero_tentative": 1,
    "mot_a_trouver": "AVION",
    "mot_propose": "",
    "est_termine": false
};

// Je crée la grille de jeu
creer_grille(jeu.nombre_tentatives, jeu.nombre_lettres);

// Je sélectionne la première case
selectionner_case(1, 1);

// Lorsqu'une touche du clavier est préssée ...
document.onkeydown = (evenement_clavier) => {
    if (en_cours(jeu)) { // Le jeu n'est pas terminé
        if (est_lettre_pressee(evenement_clavier)) { // Si cette touche est une lettre ...
            let lettre = evenement_clavier.key;
    
            lancer_mecanique_ajout(lettre, jeu); // Lancer la mécanique d'ajout de la lettre dans le jeu
        } else if (est_suppression_pressee(evenement_clavier)) { // Si cette touche est la touche de suppression ...
            lancer_mecanique_suppression_lettre(jeu); // Lancer la mécanique de suppression de la lettre dans le jeu
        } else if (est_validation_pressee(evenement_clavier)) { // Si cette touche est la touche 'Entrée' ...
            lancer_mecanique_validation_mot_propose(jeu);
        };
    };
};

// Lorsqu'on effectue un clic de souris ...
document.onmousedown = (evenement_clic) => {
    if (en_cours(jeu)) {
        if (est_lettre_cliquee(evenement_clic)) { // Une lettre du clavier virtuel à été cliquée ...
            let lettre = evenement_clic.target.innerHTML;

            lancer_mecanique_ajout(lettre, jeu); // Lancer la mécanique d'ajout de la lettre dans le jeu
        } else if (est_suppression_cliquee(evenement_clic)) { // La touche de suppression du clavier virtuel à été cliquée ...
            lancer_mecanique_suppression_lettre(jeu); // Lancer la mécanique de suppression de la lettre dans le jeu
        } else if (est_validation_cliquee(evenement_clic)) { // La touche 'Entrée' du clavier virtuel à été cliquée ...
            lancer_mecanique_validation_mot_propose(jeu);
        };
    };
};
