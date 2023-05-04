const moment = require('moment');
const urlUtil = require('../utils/urlUtil');
const config = require(urlUtil.getPath('../config.min.js'));
const cron = require('node-cron');
const googleApiUtil = require(urlUtil.getPath('./googleApiUtil.min.js'))
/**
 * Obter data e hora atual.
 * @returns Data e hora.
 */
function getDateTime() {
    let currentDate = moment().format(config.formats.datetime_format);
    return currentDate;
}

/**
 * Obter data atual.
 * @returns Data atual.
 */
function getDate() {
    let currentDate = getDateTime();
    currentDate = currentDate.slice(0, 10);
    return currentDate;
}

/**
 * Obter o início da data atual, começando à meia-noite
 * @returns current date
 */
function getBegginingOfDate() {
    let currentDate = getDate();
    currentDate += ' - 00:00:00';
    return currentDate;
}

/**
 * Obter hora e data futura por minutos de uma data/hora.
 * @param {*} dateTime Date e hora.
 * @param {*} minutes Quantidade em minutos.
 * @returns Data e hora com minutos adicionados.
 */
function getFututeDateTimeByMinutes(dateTime, minutes) {
    let time = moment(dateTime, config.formats.datetime_format)
        .add(minutes, 'minutes')
        .format(config.formats.datetime_format);
    return time;
}

/**
 * Obter hora e data futura por dias de uma data/hora.
 * @param {*} dateTime Date e hora.
 * @param {*} days Quantidade em dias.
 * @returns Data e hora com dias adicionados.
 */
function getFututeDateTimeByDays(dateTime, days) {
    let time = moment(dateTime, config.formats.datetime_format)
        .add(days, 'days')
        .format(config.formats.datetime_format);
    return time;
}

/**
 * Obter hora e data passada por minutos de uma data/hora.
 * @param {*} dateTime Date e hora.
 * @param {*} minutes Quantidade em minutos.
 * @returns Data e hora passada.
 */
function getPastDateTimeByMinutes(dateTime, minutes) {
    let time = moment(dateTime, config.formats.datetime_format)
        .subtract(minutes, 'minutes')
        .format(config.formats.datetime_format);
    return time;
}

/**
 * Obter hora e data passada por horas de uma data/hora.
 * @param {*} dateTime Date e hora.
 * @param {*} hours Quantidade em horas.
 * @returns Data e hora passada.
 */
function getPastDateTimeByHours(dateTime, hours) {
    let time = moment(dateTime, config.formats.datetime_format)
        .subtract(hours, 'hours')
        .format(config.formats.datetime_format);
    return time;
}


/**
 * Obter hora e data passada por dias de uma data/hora.
 * @param {*} dateTime Date e hora.
 * @param {*} days Quantidade em dias.
 * @returns Data e hora passada.
 */
function getPastDateTimeByDays(dateTime, days) {
    let time = moment(dateTime, config.formats.datetime_format)
        .subtract(days, 'days')
        .format(config.formats.datetime_format);
    return time;
}

/**
 * Obter uma data no formato timestemp.
 * @param {*} date Data e hora.
 * @returns Timestemp.
 */
function getDateTimeTimestamp(date) {
    let d = moment(date, config.formats.datetime_format);
    return d.format('X');
}

/**
 * Obter a data e hora atual em timestamp.
 * @returns Data e hora atual em unix timestamp.
 */
function getNowTimestamp() {
    return getDateTimeTimestamp(new Date());
}

/**
 * Converter timestamp para cron.
 * @param {*} timestamp Unix timestamp.
 * @returns Data e hora em formato 'Cron'.
 */
function dateToCron(timestamp) {
    var date = new Date(timestamp * 1000);
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`
}

/**
 * Obter o timestamp do próximo dia exatamente as 00:00:00
 * @returns Timestemp meia-noite de amanhã.
 */
function nextProcessMidnight() {
    let today = getDate() + ' - 00:00:00';
    let tomorrow = getFututeDateTimeByDays(today, 1);
    return getDateTimeTimestamp(tomorrow);
}

function nextProcessRefreshToken() {
    let now = getDateTime();
    let after = getFututeDateTimeByMinutes(now,2);
    return getDateTimeTimestamp(after);
}


function processRefreshToken() {
    let nextProcess = nextProcessRefreshToken();
    let dCron = dateToCron(nextProcess);

    cron.schedule(dCron, () => {
        googleApiUtil.refreshToken();
        processRefreshToken()
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })
}

/**
 * Função recursiva para sempre processar a meia noite o datascience.
 */
function processOpportunityMidnight() {
    let nextProcess = nextProcessMidnight();
    let dCron = dateToCron(nextProcess);

    cron.schedule(dCron, () => {
        console.log('do stuff')
        processOpportunityMidnight();
    }, {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    })
}


/**
 * Exportação.
 */
module.exports = {
    getDateTime,
    getFututeDateTimeByMinutes,
    getFututeDateTimeByDays,
    getPastDateTimeByMinutes,
    getDate,
    getBegginingOfDate,
    getPastDateTimeByDays,
    getDateTimeTimestamp,
    getPastDateTimeByHours,
    getNowTimestamp,
    dateToCron,
    nextProcessMidnight,
    processOpportunityMidnight,
    processRefreshToken,
    nextProcessRefreshToken
};
