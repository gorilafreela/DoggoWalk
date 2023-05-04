const mongoose = require('mongoose')
const urlUtil = require('../utils/urlUtil');
const mongooseUtil = require(urlUtil.getPath('../utils/mongooseUtil.min.js'));
var db = mongooseUtil.connect();

/**
 * Esquema padrão do usuário.
 * @returns Esquema do usuário.
 */
var userSchema = new mongoose.Schema({},
    {strict: false}
);


module.exports = mongoose.model('User', userSchema);
