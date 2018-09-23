import Fireshot from '.'
import { pick } from 'lodash-es'

/**
 * A Model is responsable for managing the firestore refs
 */
export default class Model {
    /**
     * for now arquetype will be just an array of document keys,
     * but soon it will be a class-based archetype with types
     * @param {Archetype} archetype 
     */
    constructor(collectionName, archetype) {
        const collection = Fireshot().firebase.firestore().collection(collectionName)
        
        this.children = []
        this.archetype = archetype
        this.collectionName = collectionName
        this.collection = collection
    }

    $setupParentListener() {
        this.$parentListener = Fireshot().functions.firestore.document(`${this.parent.collectionName}/{key}`)
            .onWrite((change, context) => {
                const rawData = change.after.data()
                const persistentData = this.archetype 
                    ? pick(rawData, this.archetype) 
                    : rawData

                console.log('key', context.params.key, 'persistentData', persistentData)
                
                return this.collection.doc(context.params.key).set(persistentData)
            })

        Fireshot().$subscribe(`extend__${this.parent.collectionName}__to__${this.collectionName}`, this.$parentListener)
    }

    $setParent(parent, archetype) {
        this.extends = true
        this.parent = parent
        this.archetype = archetype
        this.$setupParentListener()
    }

    extend(collectionName, childArchetype) {
        const child = new Model(collectionName, childArchetype)
        child.$setParent(this, childArchetype)
        this.children.push(child)
        return child
    }
}
