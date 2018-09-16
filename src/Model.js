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
        
        this.archetype = archetype
        this.collection = collection
    }
}
