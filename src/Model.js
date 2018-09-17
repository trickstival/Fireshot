import Fireshot from '.'

/**
 * A Model is responsable for managing the firestore refs
 */
export default class Model {
    /**
     * 
     * @param {Archetype} archetype 
     */
    constructor(collectionName, archetype) {
        const collection = Fireshot().firebase.firestore().collection(collectionName)
        
        this.children = []
        this.archetype = archetype
        this.collection = collection
    }

    $setParent (parent) {
        this.extends = true
        this.parent = parent
    }

    extend(collectionName, childArchetype) {
        const child = new Model(collectionName, childArchetype)
        child.$setParent(this)
        this.children.push(child)
        return child
    }
}
