setInterval(_ => _, Number.MAX_SAFE_INTEGER)

const admin = require('firebase-admin')

var serviceAccount = require('./key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

admin.firestore().collection('nonce').onSnapshot(val => {
    console.log(val)
})
