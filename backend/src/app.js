/**
 * Packages
 */
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const moment = require('moment')
const urlUtil = require('./utils/urlUtil')
//const datetimeUtil = require(urlUtil.getPath('./utils/datetimeUtil.min.js'));
const loginMiddleware = require(urlUtil.getPath('./middlewares/loginMiddleware.min.js'));




if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

/**
 * Express
 */
const app = express()
app.use(express.json({limit: '10mb'}));
app.use(express.json())
app.use(cors())
app.use(loginMiddleware.action);

/**
 * Port
 */
const port = 5000;

/**
 * Brazil time and Date pattern
 */
moment.locale('pt-br')

/**
 * Configuring Routes
 */
app.use('/user', require(urlUtil.getPath('./routes/userRoute.min.js')));
// datetimeUtil.processRefreshToken();


const os = require('os');
const ifaces = os.networkInterfaces();
let ipAddress;

Object.keys(ifaces).forEach(ifname => {
  let alias = 0;

  ifaces[ifname].forEach(iface => {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }
    if (alias >= 1) {

      console.log(`${ifname}:${alias}`, iface.address);
    } else {
      console.log(ifname, iface.address);
    }
    ++alias;
    ipAddress = iface.address;
  });
});

app.listen(port, () => {
  console.log(`Server has just started at http://${ipAddress}:${port}`);
});
