import Model from './Model'
import Archetype from './Archetype'
import { NotInstantiated } from './errors/FIreshotErrors';

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
		Fireshot.ready = true
	}	
	return Fireshot
}

Fireshot.model = (archetype, collectionName) => {
	return new Model(archetype, collection)
}

Fireshot.archetype = () => {
	return new Archetype()
}