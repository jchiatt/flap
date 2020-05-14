const admin = require('firebase-admin');
const adminConfig = require('../firebase/prod.json');

try {
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: process.env.firebaseDatabaseUrl,
  });
} catch (error) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack);
  }
}

module.exports = admin.firestore();
