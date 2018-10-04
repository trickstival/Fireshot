# Fireshot

## This lib is under development

This is a lib that abstracts the firebase modelling. If you want to contribute
just send me an e-mail: trick_stival@hotmail.com or open a PR!

## Example of usage

```js
// functions/index.js
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const Fireshot = require('./fireshot/index').default

const config = '<YOUR-CONFIG>'
admin.initializeApp(config)

const fireshot = Fireshot(admin, functions)

// passing the name of the collection and the properties you want fireshot to interact
const person = fireshot.model('person', ['name', 'age'])
// every persons name will be replicated in a doc at peopleNames collection
person.extend('peopleNames', ['name'])

const dog = fireshot.model('dog', ['bark', 'dogName'])

const personsDogs = fireshot.model('personsDogs')
person.select('name').join(dog).into(personsDogs)

module.exports = fireshot.boundFunctions

```
