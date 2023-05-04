/**
 * Obter URL base do servidor
 * @returns URL da base do servidor
 */
function getBaseUrl() {
    if (process.env['NODE_ENV'] == 'prod') {
        return 'https://iara.online';
    } else {
        return 'http://18.214.74.178';
    }
}

/**
 * Obtenha o caminho, corrija se o modo de produção
 * @param {*} path caminho
 * @returns sufixo do env
 */
function getPath(path) {
    if (process.env['NODE_ENV'] == 'prod') {
        return path;
    } else {
        return path.substring(0, path.length - '.min.js'.length);
    }
}

/**
 * Retornar verdadeiro caso estiver em ambiente de produção
 * @returns verdadeiro se estiver em modo de produção
 */
function isProd() {
    if (process.env['NODE_ENV'] == 'prod')
        return true;
    return false;
}


module.exports = {
    getBaseUrl,
    getPath,
    isProd
};
