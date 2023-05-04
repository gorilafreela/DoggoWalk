const urlUtil = require('./utils/urlUtil');
const env = process.env['NODE_ENV'];

/**
 * Confiração tanto para produção como desenvolvimento.
 */
if (env == 'prod') {
    module.exports = require(urlUtil.getPath('./configProd.min.js'));
} else {
    module.exports = require(urlUtil.getPath('./configDev.min.js'));
}
