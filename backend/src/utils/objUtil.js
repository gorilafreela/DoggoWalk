/**
 * Objeto mongo para json
 * @param {*} mongoObj Mongo Object
 * @returns json
 */
function mongoToJson(mongoObj) {
  let obj = mongoObj.toObject();
  let str = JSON.stringify(obj);
  return JSON.parse(str);
}

module.exports = {
  mongoToJson,
};
