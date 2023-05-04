const express = require("express");
const router = express.Router();
const urlUtil = require("../utils/urlUtil");
const userService = require(urlUtil.getPath("../services/userService.min.js"));
const routeUtil = require(urlUtil.getPath("../utils/routeUtil.min.js"));
const userValidator = require(urlUtil.getPath(
  "../validators/userValidator.min.js"
));

/**
 * Rota de cadastro do usuário.
 */
router.post("/register", (req, res) => {
  try {
    userValidator.validateAddUserData(req.body);
  } catch (err) {
    res.status(400).send(routeUtil.errorMessage(err.message));
    return;
  }

  userService
    .add(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.role,
    )
    .then(
      (data) => {
        res.send(data);
      },
      (err) => {
        routeUtil.processRouteError(err).then((status) => {
          res.status(status).send(routeUtil.errorMessage(err.message));
        });
      }
    );
});

/**
 * Rota de login do usuário.
 */
router.post("/login", (req, res) => {
  try {
    userValidator.validateLoginUserData(req.body);
  } catch (err) {
    res.status(400).send(routeUtil.errorMessage(err.message));
    return;
  }

  userService.login(req.body.email, req.body.password).then(
    (user) => {
      res.send(user);
    },
    (err) => {
      routeUtil.processRouteError(err).then((status) => {
        res.status(status).send(routeUtil.errorMessage(err.message));
      });
    }
  );
});

/**
 * Rota de detalhes do usuário.
 */
router.get("/details", (req, res) => {
  let token = req.header("Authorization");
  userService.getUserByToken(token).then(
    (user) => {
      res.send(user);
    },
    (err) => {
      routeUtil.processRouteError(err).then((status) => {
        res.status(status).send(routeUtil.errorMessage(err.message));
      });
    }
  );
});


router.post("/complete-profile", (req, res) => {
  const token = req.header("Authorization");
  try {
    userValidator.validateCompleteProfile(req.body);
  } catch (err) {
    res.status(400).send(routeUtil.errorMessage(err.message));
    return;
  }
  userService.completeProfile(req.body.description,req.body.price,req.body.picture,token).then(
    (user) => {
      res.send(user);
    },
    (err) => {
      routeUtil.processRouteError(err).then((status) => {
        res.status(status).send(routeUtil.errorMessage(err.message));
      });
    }
  );
});







/**
 * Exportação.
 */
module.exports = [router];
