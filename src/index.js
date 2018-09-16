import Model from './Model'
import Archetype from './Archetype'

class FireshotError extends Error {
	constructor(...args) {
		super(...args)
		Error.captureStackTrace(this, FireshotError)
	}
}

class AttributeNotDefined extends FireshotError {
	constructor() {
		super("Couldn't create a Fireshot Instance.")
		Error.captureStackTrace(this, AttributeNotDefined)
	}
}

const required = () => {
	throw new AttributeNotDefined()
}


/**
 * Fireshot holds all the framework parts, such as Model and Archetype
 */
export default function Fireshot (firebase = required(), functions = required()) {
	if (Fireshot.ready)
		return Fireshot

	Fireshot.firebase = firebase
	Fireshot.functions = functions
	Fireshot.ready = true
	
	return Fireshot
}

Fireshot.model = (archetype, collectionName) => {
	const collection = Fireshot.firebase.firestore().collection(collectionName)
	return new Model(archetype, collection)
}

Fireshot.Archetype = Archetype
