/**
 * Definir ambiente como 'desenvolvimento'
 */
function useDev() {
    process.env['NODE_ENV'] = 'dev';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Definir ambiente como 'produção'
 */
function useProd() {
    process.env['NODE_ENV'] = 'prod';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Definir ambiente como 'teste'
 */
function useTest() {
    process.env['NODE_ENV'] = 'test';
    console.log('Using environment: ' + process.env['NODE_ENV']);
}

/**
 * Checar se o ambiente está como produção
 * @returns true or false
 */
function isProd() {
    return process.env['NODE_ENV'] == 'prod';
}

/**
 * Checar se o ambiente está como teste
 * @returns true or false
 */
function isTest() {
    return process.env['NODE_ENV'] == 'test';
}

/**
 * Checar se o ambiente está como desenvolvimento
 * @returns true or false
 */
function isDev() {
    return process.env['NODE_ENV'] == 'dev';
}

/**
 * Definir ambiente através de linha de comando.
 * Arguments: --test (test), --prod (production) or --dev (development)
 */
function setEnvByCommandLineParam() {
    if (!process.argv.length) {
        useDev();
        return;
    }
    let env = process.argv[2];
    if (env == '--test') {
        useTest();
    } else if (env == '--prod') {
        useProd();
    } else {
        useDev();
    }
}

/**
 * Exports
 */
module.exports = {
    setEnvByCommandLineParam,
    useDev,
    useProd,
    useTest,
    isProd,
    isDev,
    isTest
};
