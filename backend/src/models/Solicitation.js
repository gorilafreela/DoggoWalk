const mongoose = require('mongoose')
const urlUtil = require('../utils/urlUtil');
const mongooseUtil = require(urlUtil.getPath('../utils/mongooseUtil.min.js'));
var db = mongooseUtil.connect();
var solicitationSchema = new mongoose.Schema({},
    {strict: false}
);

module.exports = mongoose.model('solicitation', solicitationSchema);
