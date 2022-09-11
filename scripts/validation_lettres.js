/**
 * Module de validation des lettres
 */

/**
 * Est-ce que cette lettre est présente à cette position précise dans le mot ?
 * @param {String} lettre
 * @param {Int} position
 * @param {String} mot
 * @returns {Boolean}
 * @example
 * // returns true
 * est_presente("A", 0, "AVION");
 * @example
 * // returns false
 * est_presente("C", 3, "AVION");
 */
function est_presente(lettre, position, mot) {
    return mot.charAt(position) === lettre;
};

/**
 * Est-ce que cette lettre existe dans le mot ?
 * @param {String} lettre
 * @param {String} mot
 * @returns {Boolean}
 * @example
 * // returns true
 * existe("A", "AVION");
 * @example
 * // returns false
 * existe("C", "AVION");
 */
function existe(lettre, mot) {
    return mot.indexOf(lettre) !== -1;
};

/**
 * Le nombre d'occurences de la lettre dans le mot
 * @param {String} lettre
 * @param {String} mot
 * @returns {Int}
 * @example
 * // returns 1
 * nombre_occurences("A", "AVION");
 * @example
 * // returns 2
 * nombre_occurences("N", "CANNE");
 */
function nombre_occurences(lettre, mot) {
    return mot.split(lettre).length - 1;
};

/**
 * Le nombre de lettres présents dans le mot
 * @param {String} mot
 * @returns {Int}
 * @example
 * // returns 5
 * nombre_lettres("CANNE");
 * @example
 * // returns 6
 * nombre_lettres("MONTRE");
 */
function nombre_lettres(mot) {
    return mot.length;
};

/**
 * La lettre présente à cette position dans le mot
 * @param {Int} position
 * @param {String} mot
 * @returns {String}
 * @example
 * // returns "A"
 * lettre(1, "CANNE");
 * @example
 * // returns "I"
 * lettre(2, "AVION");
 */
function lettre(position, mot) {
    return mot.charAt(position);
};

/* ------------------------------------- Main ------------------------------------- */

/**
 * Le résultat de la comparaison du mot_compare avec le mot_referent
 * Lettre bonne et bien placée <=> V
 * lettre bonne mais mal placée <=> O
 * lettre mauvaise <=> _
 * @param {String} mot_referent Mot de X lettres
 * @param {String} mot_compare Mot de X lettres
 * @returns {String}
 * @example
 * // returns "_V_V_"
 * resultat_comparaison("SAINT", "CANNE");
 * @example
 * // returns "_VOV_"
 * resultat_comparaison("CANNE", "SAINT");
 * @example
 * // returns "__VVV"
 * resultat_comparaison("TRACE", "PLACE");
 */
function resultat_comparaison(mot_compare, mot_referent) {
    let resultat = "";
    let lettres_analysees_precedemment = "";
    let nombre_iterations = nombre_lettres(mot_referent) // nombre_lettres(mot_referent) === nombre_lettres(mot_compare)

    for (let position = 0; position < nombre_iterations; position++) {
        let lettre_analysee = lettre(position, mot_compare);

        if (est_presente(lettre_analysee, position, mot_referent)) { // la lettre est bonne et bien placée
            resultat += "V";
            lettres_analysees_precedemment += lettre_analysee; // la 'liste' des lettres déjà analysées précédemment s'enrichie
        } else {
            if (!existe(lettre_analysee, mot_referent)) { // la lettre est mauvaise
                resultat += "_";
                lettres_analysees_precedemment += lettre_analysee; // la 'liste' des lettres déjà analysées précédemment s'enrichie
            } else {
                if (nombre_occurences(lettre_analysee, lettres_analysees_precedemment) < nombre_occurences(lettre_analysee, mot_referent)) {
                // la lettre proposée n'a pas été proposée plus de fois qu'elle est présente dans le mot
                    resultat += "O";
                } else {
                    resultat += "_";
                };
                lettres_analysees_precedemment += lettre_analysee; // la 'liste' des lettres déjà analysées précédemment s'enrichie
            };
        };
    };

    return resultat;
};
