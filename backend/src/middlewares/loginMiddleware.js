const urlUtil = require("../utils/urlUtil");
const userRepository = require(urlUtil.getPath(
  "../repositories/userRepository.min.js"
));
const routeUtil = require(urlUtil.getPath("../utils/routeUtil.min.js"));
const config = require(urlUtil.getPath("../config.min.js"));
const moment = require("moment");


const PUBLIC_URLS = [
  /\/user\/login/g,
  /\/user\/details/g,
  /\/user\/register/g,
  /\/user\/today/g,
];

function action(req, res, next) {
 
  let url = routeUtil.removeLastUrlSlash(req.url);
  for (let i = 0; i < PUBLIC_URLS.length; i++) {
    let publicUrlRegex = PUBLIC_URLS[i];
    if (url.match(publicUrlRegex)) {
      next();
      return;
    }
  }

  let token = req.header("Authorization");
  if (!token) {
    res.status(401).send(routeUtil.errorMessage("Acesso negado!"));
    return;
  }
  userRepository.findByToken(token).then((user) => {
    if (!user) {
      res.status(401).send(routeUtil.errorMessage("Token inválido"));
      return;
    }
    let isSameOrAfter = moment().isSameOrAfter(
      moment(user.expirationToken, config.formats.datetime_format)
    );
    if (isSameOrAfter) {
      res
        .status(401)
        .send(routeUtil.errorMessage("Token expirado, logar novamente"));
      return;
    }
    next();
  });
}

module.exports = {
  action,
};
