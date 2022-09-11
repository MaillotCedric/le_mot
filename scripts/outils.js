/**
 * Caisse à outils de fonctions
 */

/**
 * Afficher un objet JavaScript dans la console
 * @param {Object} param L'objet à afficher
 */
function afficher(param) {
    console.log(param);
};

/**
 * Une chaîne de caractères de longueur définie et composée de caractères tous identiques
 * @param {Int} nombre_caracteres Nombre de caractères <=> longueur de la chaîne de caractères
 * @param {String} caractere Caractère répété
 * @returns {String}
 * @example
 * // returns "VVVVV"
 * chaine(5, "V");
 * @example
 * // returns "**"
 * chaine(2, "*");
 */
function chaine(nombre_caracteres, caractere) {
    let resultat = "";

    for (let index_caractere = 0; index_caractere < nombre_caracteres; index_caractere++) {
        resultat += caractere;
    };

    return resultat;
};

/**
 * Les caractères d'une chaîne de caractères
 * @param {String} chaine_caracteres
 * @returns {Array}
 * @example
 * // returns ["a", "b", "c"]
 * caracteres("abc");
 * @example
 * // returns ["A", "v", "i", "o", "n"]
 * caracteres("Avion");
 */
function caracteres(chaine_caracteres) {
    return chaine_caracteres.split("");
};

/**
 * La longueur de la chaîne de caractères
 * @param {String} chaine_caracteres
 * @returns {Int}
 * @example
 * // returns 5
 * longueur("avion");
 */
function longueur(chaine_caracteres) {
    return chaine_caracteres.length;
};

/**
 * La chaîne de caractères 1 concaténée à la chaîne de caractères 2
 * @param {String} chaine_caracteres_1
 * @param {String} chaine_caracteres_2
 * @returns {String}
 * @example
 * // returns "avion"
 * concatenee("avio", "n");
 */
function concatenee(chaine_caracteres_1, chaine_caracteres_2) {
    return chaine_caracteres_1 + chaine_caracteres_2;
};

/**
 * La chaîne de caractères tronquée d'un certain nombre de caractères
 * @param {String} chaine_caracteres
 * @param {Int} nombre_caracteres Le nombre de caractères à enlever
 * @returns {String}
 * @example
 * // returns "avio"
 * tronquee("avion", 1);
 * @example
 * // returns "av"
 * tronquee("avion", 3);
 */
function tronquee(chaine_caracteres, nombre_caracteres) {
    return chaine_caracteres.slice(0, -1 * nombre_caracteres);
};

/**
 * Le mot en minuscule
 * @param {String} mot
 * @returns {String}
 * @example
 * // returns "avion"
 * minuscule("AVION");
 * @example
 * // returns "avion"
 * minuscule("Avion");
 */
function minuscule(mot) {
    return mot.toLowerCase();
};

/**
 * Le mot en majuscule
 * @param {String} mot
 * @returns {String}
 * @example
 * // returns "AVION"
 * majuscule("avion");
 * @example
 * // returns "AVION"
 * majuscule("Avion");
 */
function majuscule(mot) {
    return mot.toUpperCase();
};

/**
 * L'index de l'élément dans le tableau
 * @param {Object} element
 * @param {Array} tableau
 * @returns {Boolean}
 * @example
 * // returns 2
 * index(18, [3, 10, 18, 20]);
 * @example
 * // returns -1
 * index("maxime", ["jean", "paul", "christian"]);
 */
function index(element, tableau) {
    return tableau.findIndex((element_analyse) => {
        return element_analyse === element;
    });
};

/**
 * L'élément est-il présent dans le tableau ?
 * @param {Object} element
 * @param {Array} tableau
 * @returns {Boolean}
 * @returns {Boolean}
 * @example
 * // returns true
 * est_present(18, [3, 10, 18, 20]);
 * @example
 * // returns false
 * est_present("maxime", ["jean", "paul", "christian"]);
 */
function est_present(element, tableau) {
    return index(element, tableau) !== -1;
};
