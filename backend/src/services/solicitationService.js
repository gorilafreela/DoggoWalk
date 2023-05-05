const urlUtil = require("../utils/urlUtil");
const datetimeUtil = require(urlUtil.getPath("../utils/datetimeUtil.min.js"));
const userRepository = require(urlUtil.getPath("../repositories/userRepository.min.js"));
const solicitationRepository = require(urlUtil.getPath("../repositories/solicitationRepository.min.js"));
const securityUtil = require(urlUtil.getPath("../utils/securityUtil.min.js"));
const AppError = require(urlUtil.getPath("../errors/appError.min.js"));
const objUtil = require(urlUtil.getPath("../utils/objUtil.min.js"));


async function add(token,to) {
  let fromUser = await userRepository.findByToken(token);
  let toUser = await userRepository.findById(to);
  if (!fromUser) {
    throw new AppError(`Invalid Token`);
  } else if(!toUser) {
    throw new AppError(`Walker not found`);
  }

  fromUser = objUtil.mongoToJson(fromUser);
  toUser = objUtil.mongoToJson(toUser);

  if(fromUser.role == 1) {
    throw new AppError(`Invalid user to this action...`);
  } else if (toUser.role == 0) {
    throw new AppError(`This user is not a walker.`);
  } else if (!toUser.completed) {
    throw new AppError(`This walker haven't finished profile.`);
  }

  const pending = await solicitationRepository.hasPendingSolicitation(fromUser._id,toUser._id);

  if(pending) {
    throw new AppError(`You can't send a request now, you have already sent a book to this user.`);
  }

  return await solicitationRepository.addDocument(fromUser._id,toUser._id)
}

async function getAllByTo(token) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user =  objUtil.mongoToJson(user);
  let solicitations = await solicitationRepository.getAllByTo(user._id);
  return solicitations;
}

async function getAllAwaiting(token) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user =  objUtil.mongoToJson(user);

  let solicitations = await solicitationRepository.getAllAwaiting(user._id);
  return solicitations;
}

async function getAllProgress(token) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user =  objUtil.mongoToJson(user);

  let solicitations = await solicitationRepository.getAllProgress(user._id);
  return solicitations;
}

async function reply(id,action,token) {

  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user =  objUtil.mongoToJson(user);

  let solicitation = await solicitationRepository.findById(id);
  if(!solicitation) {
    throw new AppError(`Solicitation not found.`);
  } 
  solicitation =  objUtil.mongoToJson(solicitation);

  if(solicitation.to != user._id) {
    throw new AppError(`You cannot interact with this solicitation.`);
  }



  if(action) {
    return await solicitationRepository.updateById(id,{
      accepted:1
    });
  } 
  
  return await solicitationRepository.updateById(id,{
    active:0
  });
}

async function getBook(token,id) {
  let user = await userRepository.findByToken(token);
  if (!user) {
    throw new AppError(`Invalid Token`);
  }
  user =  objUtil.mongoToJson(user);

  let solicitation = await solicitationRepository.findById(id);
  if(!solicitation) {
    throw new AppError(`Solicitation not found.`);
  } 
  solicitation =  objUtil.mongoToJson(solicitation);

  if(solicitation.from != user._id) {
    throw new AppError(`You cannot interact with this solicitation.`);
  }
  return solicitation
}

async function cancel(to,token) {
  let fromUser = await userRepository.findByToken(token);
  let toUser = await userRepository.findById(to);
  if (!fromUser) {
    throw new AppError(`Invalid Token`);
  } else if(!toUser) {
    throw new AppError(`Walker not found`);
  }
  await solicitationRepository.cancel(fromUser._id,toUser._id);
  return "deleted"
}



module.exports = {
  add,getAllByTo,reply,getBook,cancel,getAllAwaiting,getAllProgress
 
};
