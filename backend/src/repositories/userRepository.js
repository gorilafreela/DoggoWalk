const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;
const urlUtil = require("../utils/urlUtil");
var User = require(urlUtil.getPath("../models/User.min.js"));

const datetimeUtil = require(urlUtil.getPath("../utils/datetimeUtil.min.js"));

/**
 * Registrar um novo usuário a plataforma.
 * @param {*} email E-mail.
 * @param {*} password Senha.
 * @param {*} cpfOrCnpj CPF ou CNPJ.
 * @param {*} fullname  Nome completo.
 * @param {*} birthdate Data de nascimento ou data de fundação.
 * @param {*} token  Token sha-256 gerado.
 * @param {*} expirationToken Expiração do Token do usuário usuário.
 * @returns documento usuário.
 */
async function addDocument(
  email,
  password,
  fullname,
  role,
  token,
  expirationToken
) {
  const doc = new User({
    email: email,
    password: password,
    fullname: fullname,
    token: token,
    expirationToken: expirationToken,
    active: 1,
    role: role,
    created: datetimeUtil.getDateTime(),
  });
  try {
    await doc.save();
    return await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
}

/**
 * Acessar conta (login), através das credenciais.
 * @param {*} email E-mail.
 * @param {*} password Senha.
 * @returns Objeto 'usuário'.
 */
async function login(email, password) {
  return await User.findOne({ email: email, password: password });
}


/**
 * Obter um usuário através do seu e-mail.
 * @param {*} email E-mail.
 * @returns Objeto 'usuário'.
 */
async function findByEmail(email) {
  return await User.findOne({ email: email });
}

/**
 * Obter um usuário através do seu token.
 * @param {*} token Token sha-256.
 * @returns Objeto 'usuário'.
 */
async function findByToken(token) {
  return await User.findOne({ token: token });
}



/**
 * Obter um usuário através do seu ID.
 * @param {*} id ID do documento.
 * @returns ID do documento.
 */
async function findById(id) {
  id = mongoose.Types.ObjectId(id);
  return await User.findOne({ _id: id });
}

/**
 * Encontrar todos os usuários
 * @returns objetos 'usuarios'.
 */
async function getAll() {
  return await User.find();
}

/**
 * Atualizar um usuário através do seu Id.
 * @param {*} id Id do usuário.
 * @param {*} data Dados para ser atualizado.
 * @returns Documento 'usuário'
 */
async function updateById(id, data) {
  await User.findByIdAndUpdate(id, data);
  return await User.findById(id);
}

/**
 * Atualizar Token e expiração do mesmo.
 * @param {*} id ID do documento.
 * @param {*} token Token sha-256.
 * @param {*} expirationToken
 * @returns ID do documento.
 */
async function updateToken(id, token, expirationToken) {
  const data = {
    token: token,
    expirationToken: expirationToken,
  };
  await User.findByIdAndUpdate(id, data);
  return await User.findById(id);
}

module.exports = {
  addDocument,
  login,
  findByEmail,
  findById,
  findByToken,
  getAll,
  updateById,
  updateToken,

};
