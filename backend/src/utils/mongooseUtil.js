const mongoose = require('mongoose')
const envUtil = require('./envUtil.js')

let mainBd = 'DoggoWalk-db'

/**
 * Conexão Mongodb
 */
function connect() {
    mongoose.connect(`mongodb://localhost:27017/${mainBd}`, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    var db = mongoose.connection;
    return db;
}



module.exports = {
    connect
}
