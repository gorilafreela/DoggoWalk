const urlUtil = require("../utils/urlUtil");
const datetimeUtil = require(urlUtil.getPath("../utils/datetimeUtil.min.js"));
const userRepository = require("../repositories/userRepository");
const securityUtil = require(urlUtil.getPath("../utils/securityUtil.min.js"));
const AppError = require(urlUtil.getPath("../errors/appError.min.js"));
const objUtil = require(urlUtil.getPath("../utils/objUtil.min.js"));

async function add(email, password, fullname, role) {
  email = email.toLowerCase();
  let user = await userRepository.findByEmail(email);
  if (user) {
    throw new AppError(`E-mail not avaiable.`);
  }
  role = parseInt(role);
  //security
  password = securityUtil.generateSha256Hash(password);
  let token = securityUtil.generateSha256Token(
    password + datetimeUtil.getDateTime()
  );
  let expirationToken = datetimeUtil.getFututeDateTimeByDays(
    datetimeUtil.getDateTime(),
    30
  );

  return await userRepository.addDocument(
    email,
    password,
    fullname,
    role,
    token,
    expirationToken
  );
}

async function login(email, password) {
  email = email.toLowerCase();
  password = securityUtil.generateSha256Hash(password);
  let user = await userRepository.login(email, password);
  if (!user) {
    throw new AppError(`E-mail or password incorrect`);
  }

  user = await userRepository.findByEmail(email);
  user = objUtil.mongoToJson(user);

  let expirationToken = datetimeUtil.getFututeDateTimeByDays(
    datetimeUtil.getDateTime(),
    30
  );

  let token = securityUtil.generateSha256Token(
    password + datetimeUtil.getDateTime()
  );
  return await userRepository.updateToken(user._id, token, expirationToken);
}

/**
 * Obter dados do usuário pelo token.
 * @param {*} token Token do usuário.
 * @param {*} removeSensitive Remover dados sensíveis?
 * @returns Dados do usuário.
 */
async function getUserByToken(token) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token.`);
  }
  return user;
}

/**
 * Obter dados do usuário pelo token.
 * @param {*} token Token do usuário.
 * @returns Dados do usuário.
 */
async function getUserById(id) {
  let user = await userRepository.findById(id);
  if (!user) {
    throw new AppError(`Usuário não encontrado.`);
  }

  let tempDoc = user.toObject();

  delete tempDoc.password;
  delete tempDoc.token;
  delete tempDoc.expirationToken;
  delete tempDoc.createdAt;
  delete tempDoc.updatedAt;
  user = tempDoc;

  return user;
}

async function completeProfile(description, price, picture, token) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user = objUtil.mongoToJson(user);
  if (user.role != 1) {
    throw new AppError(`Not valid user to this action`);
  }
  const completed = 1;
  const data = {
    description,
    price,
    picture,
    completed,
  };

  return await userRepository.updateById(user._id, data);
}

async function getAllCompleted() {
  let users = await userRepository.getAllCompleted();
  return users;
}


module.exports = {
  add,
  login,
  getUserByToken,
  getUserById,
  completeProfile,
  getAllCompleted,
};
