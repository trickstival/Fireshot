console.log('let the magic begin')
const test = require('firebase-functions-test')(require('../app.config'), './functions/key.json')

const myFunctions = require('../functions/index')
const funcao = myFunctions['extend__pessoa__to__policial']


const afterSnap = test.firestore.makeDocumentSnapshot({ 'nome': 'ronaldinho' }, 'pessoa/abc')
const before = test.firestore.makeDocumentSnapshot({ 'nome': 'ronaldinhow' }, 'pessoa/abc')
const change = test.makeChange(before, afterSnap)

test.wrap(funcao)(change, { params: { key: 'abc' } })
