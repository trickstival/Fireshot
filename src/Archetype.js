// going to be used when we discover how to deploy the firestore rules
// dinamically

export class Rule {
    /**
     * 
     * @param { Function } validator 
     * @param { String } name
     */ 
    constructor (name, validator) {
        this.validator = validator
        this.name = name
    }
}

/**
 * An archetype respresents rules for one or more models
 */
export class Archetype {
	constructor (rules) {
        this.rules = rules
    }
}


// const archetype = {
//     name: [required, minLength(4)],
//     age: [required, minValue(0), integerOnlyPositive, maxValue(120)]
// }

// Fireshot.model('person', archetype)
