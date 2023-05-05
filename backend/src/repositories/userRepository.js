const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;
const urlUtil = require("../utils/urlUtil");
var User = require(urlUtil.getPath("../models/User.min.js"));

const datetimeUtil = require(urlUtil.getPath("../utils/datetimeUtil.min.js"));


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

async function login(email, password) {
  return await User.findOne({ email: email, password: password });
}

async function findByEmail(email) {
  return await User.findOne({ email: email });
}

async function findByToken(token) {
  return await User.findOne({ token: token });
}


async function findById(id) {
  id = mongoose.Types.ObjectId(id);
  return await User.findOne({ _id: id });
}


async function getAll() {
  return await User.find();
}

async function getAllCompleted() {
  return await User.find({ completed: 1 });
}


async function updateById(id, data) {
  await User.findByIdAndUpdate(id, data);
  return await User.findById(id);
}

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
  getAllCompleted

};
