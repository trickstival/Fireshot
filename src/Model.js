import Fireshot from '.'
import JoinModel from './JoinModel'
import { getPersistentData } from './utils'

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
        this.$parentListener = Fireshot().forEachDocumentOf(this.parent.collectionName)
            .onWrite((change, context) => {
                const rawData = change.after.data()
                const persistentData = getPersistentData(rawData, this.archetype)
                
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

    /**
     * 
     * @param { String } collectionName 
     * @param { Array } childArchetype 
     */
    extend(collectionName, childArchetype) {
        const child = new Model(collectionName, childArchetype)
        child.$setParent(this, childArchetype)
        this.children.push(child)
        return child
    }

    /**
     * 
     * @param { Model } model
     * @param { Array.<String> } archetype
     */
    join (model, archetype) {
        return new JoinModel(this).join(model, archetype)
    }

    select (archetype) {
        return new JoinModel(this, archetype)
    }
}
