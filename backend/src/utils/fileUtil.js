const fs = require('fs');
var path = require('path');
const urlUtil = require('../utils/urlUtil');
const stringUtil = require(urlUtil.getPath('./stringUtil.min.js'));
const arrayUtil = require(urlUtil.getPath('./arrayUtil.min.js'));

/**
 * Obter todos os arquivos recursivamente
 * @param {*} dir diretório a ser analisado
 * @param {*} done callback
 */
function allFiles(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);

            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    allFiles(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(stringUtil.getSubstringByChar(file, '\\'));
                    next();
                }
            });

        })();
    });
}

/**
 * Obter todos os arquivos .js em uma pasta de caminho.
 * @param {*} path Caminho;
 * @returns Vetor de arquivos .js
 */
function getJsFilesByFolder(path) {
    if (!fs.existsSync(path)) {
        console.log('no dir ', path);
        return;
    }
    let files = fs.readdirSync(path).filter(file => file.includes('.js'));

    for (let i = 0; i < files.length; i++) {
        files[i] = files[i].substring(0, files[i].length - 3);
    }

    return files;
}

/**
 * Obter todos os arquivos .py em uma pasta de caminho.
 * @param {*} path Caminho;
 * @returns Vetor de arquivos .py
 */
 function getPyFilesByFolder(path) {
    if (!fs.existsSync(path)) {
        console.log('no dir ', path);
        return;
    }
    let files = fs.readdirSync(path).filter(file => file.includes('.py'));

    for (let i = 0; i < files.length; i++) {
        files[i] = files[i].substring(0, files[i].length - 3);
    }

    return files;
}


allFiles('./src', function(err, results) {
    if (err) throw err;
    results = arrayUtil.filterValues(results, []);
    results = stringUtil.getSubstring(results, -3);
    console.log(results);
});




/**
 * Exportação.
 */
module.exports = {
    getJsFilesByFolder,
    getPyFilesByFolder,
    allFiles
};
