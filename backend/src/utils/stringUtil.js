/**
 * Usado para substituir o caminho da string
 * @param {*} path Caminho
 * @returns Novo caminho */
function replacePath(path) {
    let folder = '';
    let file = '';
    let slashCount = 0;
    for (let i = 0; i < path.length; i++) {

        if (slashCount == 1) {
            folder += path.charAt(i);
        } else if (slashCount == 2) {
            file += path.charAt(i);
        }
        if (path.charAt(i) == '/') {
            slashCount++;
        }
    }

    folder = folder.substring(0, folder.length - 1);
    return path.replace(file + '', folder + '.min.js');
}

/**
 * Inverter qualquer string.
 * @param {*} str String.
 * @returns String inversa.
 */
function reverseString(str) {
    return str.split("").reverse().join("");
}

/**
 * Obter uma parte de um caminho.
 * @param {*} str string
 * @param {*} char valor do char
 * @returns substring.
 */
function getSubstringByChar(str, char) {
    let file = '';

    for (var i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) == char) {
            break;
        }
        file += str.charAt(i);
    }

    return reverseString(file);
}

/**
 * Obter uma substring
 * @param {*} values Vetor de String
 * @param {*} index índice negativo
 * @returns substring
 */
function getSubstring(values, index) {
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].substring(0, values[i].length + index);
    }
    return values;
}

/**
 *
 * @param {*} values Vetor de String.
 * @param {*} substr Substring a ser removida.
 * @returns Vetor sem a substring.
 */
function removeFromStr(values, substr) {
    for (let i = 0; i < values.length; i++) {
        if (values[i].includes(substr)) {
            values.splice(i, 999);
        }
    }
    return values;
}

/**
 * Gerador de link para publicações
 * @param {*} str string
 * @returns string formatada para link
 */
function createPublicationUrl(str) {
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    str = str.replace(/\s+/g, '-').toLowerCase();
    str = str.replace("?", "");
    str = str.replace(".", "");
    str = str.replace(";", "");
    return str;
}

/**
 * substituir todos os caracteres em uma string
 * @param {*} str string a ser modificada
 * @param {*} oldChar char a ser substituído
 * @param {*} newChar novo char
 * @returns nova string
 */
function replaceAll(str, oldChar, newChar) {
    let newStr = '';
    for (let index = 0; index < str.length; index++) {

        if (str.charAt(index) == oldChar) {
            newStr += newChar;
        } else {
            newStr += str.charAt(index);
        }
    }

    return newStr;
}

/**
 * Gerar uma string aleatória.
 * @returns random string.
 */
function randomStr () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}


/**
 * Exportação.
 */
module.exports = {
    replacePath,
    getSubstringByChar,
    getSubstring,
    reverseString,
    removeFromStr,
    replaceAll,
    createPublicationUrl,
    randomStr
};
