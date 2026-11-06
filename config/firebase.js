const { initializeApp, cert, getApps } = require("firebase-admin/app");
const serviceAccount = require("../credentials/firebase-service-account.json.json");

const firebaseApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApps()[0];

module.exports = firebaseApp;