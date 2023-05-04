const urlUtil = require('../utils/urlUtil');
const AppError = require(urlUtil.getPath('../errors/appError.min.js'));

/**
 * @param {*} text texto de mensagem de sucesso
 * @returns  Mensagem de sucesso do objeto
 */
function successMessage(text) {
    return {
        type: 'success',
        message: text
    };
}

/**
 * @param {*} text Texto da mensagem de erro
 * @returns  Mensagem de erro do objeto
 */
function errorMessage(text) {
    return {
        type: 'error',
        message: text
    };
}

/**
 * Remover última barra de URL.
 * @param {*} url URL de solicitação.
 * @returns url sem a última barra.
 */
function removeLastUrlSlash(url) {
    if (url[url.lenght - 1] == '/') {
        return url.slice(0, -1);
    }
    return url;
}

/**
 * Processe o erro de rota para verificar o tipo de erro e adicione ao log
 * @param {*} err objeto de erro
 * @returns status de resposta
 */
async function processRouteError(err) {
    if (!(err instanceof AppError)) {
        console.trace(err);
        return 500;
    }
    return 400;
}

/**
 * Exportação.
 */
module.exports = {
    successMessage,
    errorMessage,
    removeLastUrlSlash,
    processRouteError
};
