const express = require("express");
const router = express.Router();
const urlUtil = require("../utils/urlUtil");
const solicitationService = require(urlUtil.getPath(
  "../services/solicitationService.min.js"
));
const routeUtil = require(urlUtil.getPath("../utils/routeUtil.min.js"));
const userValidator = require(urlUtil.getPath(
  "../validators/userValidator.min.js"
));

/**
 * Route for book a walk
 */
router.post("/book", (req, res) => {
  let token = req.header("Authorization");
  solicitationService.add(token, req.body.to).then(
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

router.post("/reply", (req, res) => {
  let token = req.header("Authorization");
  solicitationService.reply(req.body.id, req.body.action, token).then(
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

router.get("/get-book/:id", (req, res) => {
  let token = req.header("Authorization");
  solicitationService.getBook(token,req.params.id).then(
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

router.get("/get-all", (req, res) => {
  const token = req.header("Authorization");
  solicitationService.getAllByTo(token).then(
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

router.get("/get-all-progress", (req, res) => {
  const token = req.header("Authorization");
  solicitationService.getAllProgress(token).then(
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

router.get("/get-awaiting", (req, res) => {
  const token = req.header("Authorization");
  solicitationService.getAllAwaiting(token).then(
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

router.get("/get-live", (req, res) => {
  const token = req.header("Authorization");
  solicitationService.getSharingLocation(token).then(
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



router.post("/cancel", (req, res) => {
  let token = req.header("Authorization");
  solicitationService.cancel(req.body.to, token).then(
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
 * Exportação.
 */
module.exports = [router];
