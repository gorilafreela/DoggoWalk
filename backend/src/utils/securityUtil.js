const urlUtil = require('../utils/urlUtil');
const config = require(urlUtil.getPath('../config.min.js'));
const crypto = require('crypto');

/**
 * Gera uma representação de hash SHA256 para os dados
 * @param {*} data alguns dados
 * @returns hash SHA256
 */
function generateSha256Token(data) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(data + config.security.salt + new Date().getTime());
    return sha256.digest('hex');
}

/**
 * Gera uma representação de hash SHA256 para os dados como senha.
 * @param {*} data alguns dados
 * @returns hash SHA256
 */
function generateSha256Hash(data) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(data);
    return sha256.digest('hex');
}

/**
 * Exportação.
 */
module.exports = {
    generateSha256Token,
    generateSha256Hash

};
