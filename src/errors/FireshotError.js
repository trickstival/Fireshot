export default class FireshotError extends Error {
	constructor(...args) {
		super(...args)
		Error.captureStackTrace(this, FireshotError)
	}
}