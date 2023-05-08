const mongoose = require('mongoose')
const envUtil = require('./envUtil.js')

let mainBd = 'DoggoWalk-db'

if (envUtil.isTest()) {
    mainBd = 'DoggoWalk-db-test'
}

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


function deleteAll() {
    if (envUtil.isTest()) {
      return new Promise((resolve, reject) => {
        mongoose.connection.once('open', async () => {
          try {
            await mongoose.connection.db.dropDatabase();
            console.log('dropDatabase');
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });
    } else {
      return Promise.resolve();
    }
  }
  

module.exports = {
    connect,deleteAll
}
