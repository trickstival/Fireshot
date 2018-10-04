import Model from './Model'
import Archetype from './Archetype'
import { NotInstantiated } from './errors/FireshotErrors'

const required = () => {
	if (!Fireshot.ready)
		throw new NotInstantiated()
}

/**
 * Fireshot holds all the framework parts, such as Model and Archetype
 */
export default function Fireshot (
	firebase = required(),
	functions = required(),
) {
	if (!Fireshot.ready) {
		Fireshot.firebase = firebase
		Fireshot.functions = functions
		Fireshot.boundFunctions = {}
		Fireshot.ready = true
	}	
	return Fireshot
}
/**
 * 
 * @param { String } collection 
 */
Fireshot.forEachDocumentOf = (collectionName) => {
	return Fireshot().functions.firestore.document(`${collectionName}/{key}`)
}

Fireshot.$subscribe = (functionName, cloudFunction) => {
	Fireshot.boundFunctions[functionName] = cloudFunction
}

Fireshot.model = (archetype, collectionName) => {
	return new Model(archetype, collectionName)
}

Fireshot.archetype = () => {
	return new Archetype()
}