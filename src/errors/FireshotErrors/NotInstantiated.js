import FireshotError from '../FireshotError';

export default class NotInstantiated extends FireshotError {
	constructor() {
		super('Fireshot is not instantiated, use Fireshot() with the arguments to initialize.')
		Error.captureStackTrace(this, AttributeNotDefined)
	}
}