const urlUtil = require('./urlUtil');
const fs = require('fs');
const pathUtil = require(urlUtil.getPath('../utils/pathUtil.min.js'));

/**
 * Atualizar credenciais.
 * @param {*} config 
 */
function updateCredentials(config) {

    let filename = __dirname + `/../configDev.js`;
    if (process.env.NODE_ENV == 'production') {
        filename = __dirname + `/../configProd.min.js`;
    }

    let standardConfig = `
    module.exports = {
        app_name: "${config.app_name}",
        mail: {
          user: "${config.mail.user}",
          service: "Gmail",
          client_id:
            "${config.mail.client_id}",
          client_secret: "${config.mail.client_secret}",
          access_token:
            "${config.mail.access_token}",
          refresh_token:
            "${config.mail.refresh_token}",
        },
        formats: {
          datetime_format: "${config.formats.datetime_format}",
          date_format: "${config.formats.date_format}",
        },
        pagination: { total_table_rows: ${config.pagination.total_table_rows} },
        security: {
          salt: "${config.security.salt}",
        },
      };      
    `
    fs.writeFile(filename, standardConfig, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Arquivo atualizado com sucesso.");
    });
}


module.exports = {
    updateCredentials
};
