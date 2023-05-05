const { google } = require("googleapis");
const urlUtil = require("../utils/urlUtil");
const config = require(urlUtil.getPath("../config.min.js"));
const fsUtil = require(urlUtil.getPath("../utils/fsUtil.min.js"));
//Basic credentials
const CLIENT_ID = config.mail.client_id;
const CLIENT_SECRET = config.mail.client_secret;

//https://developers.google.com/oauthplayground
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
let access_token = config.mail.access_token;
let refresh_token = config.mail.refresh_token;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: refresh_token,
});

function refreshToken () {
  oAuth2Client.refreshAccessToken((err, tokens) => {
    if (tokens == undefined) {
      console.log("Não foi possível atualizar o refresh token.");
      return;
    }
    access_token = tokens["access_token"];
    refresh_token = tokens["refresh_token"];
    //Set Config
    if (err) {
      console.log(err);
    }
    config.mail.access_token = access_token;
    config.mail.refresh_token = refresh_token;
    config.mail.client_id = CLIENT_ID;
    config.mail.client_secret = CLIENT_SECRET;
  
    fsUtil.updateCredentials(config);
  });
}

module.exports = {
  refreshToken
}