const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectId;
const urlUtil = require("../utils/urlUtil");
var Solicitation = require(urlUtil.getPath("../models/Solicitation.min.js"));

const datetimeUtil = require(urlUtil.getPath("../utils/datetimeUtil.min.js"));

async function addDocument(from, to) {
  const timestamp = new Date().getTime();
  const doc = new Solicitation({
    from: from,
    to: to,
    active: 1,
    accepted: 0,
    created: datetimeUtil.getDateTime(),
    timestamp: timestamp,
  });
  try {
    await doc.save();
    const savedDoc = await Solicitation.findOne({ timestamp: timestamp });
    return savedDoc;
  } catch (err) {
    console.log(err);
  }
}


addDocument('645342d7151e89268cfb8ae5','645343b837ac153298aff67e')

async function updateById(id, data) {
  await Solicitation.findByIdAndUpdate(id, data);
  return await Solicitation.findById(id);
}

async function getAllByTo(to) {
  return await Solicitation.find({
    to: to,
    active: 1,
  });
}

async function getAllAwaiting(from) {
  return await Solicitation.find({
    from: from,
    active: 1,
    accepted: 0,
  });
}

async function getAllProgress(from) {
  return await Solicitation.find({
    from: from,
    active: 1,
  });
}



async function findById(id) {
  id = mongoose.Types.ObjectId(id);
  return await Solicitation.findOne({ _id: id });
}


async function realTimeSolicitationById(id) {
  return await Solicitation.findOne({ _id: id , active:1, accepted:1 });
}


async function hasPendingSolicitation(from, to) {
  const solicitation = await Solicitation.find({
    from: from,
    to: to,
    active: 1,
    accepted: 0,
  });

  return solicitation.length > 0;
}

async function cancel(from, to) {
  try {
    const result = await Solicitation.deleteMany({ from: from.toString(), to: to.toString() });
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {
  addDocument,
  getAllByTo,
  updateById,
  findById,
  getAllAwaiting,
  hasPendingSolicitation,
  cancel,
  getAllProgress,
  realTimeSolicitationById
};
