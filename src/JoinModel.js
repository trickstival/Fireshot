import Model from './Model'
import Fireshot from '.'

export class JoinUnit {
    /**
     * 
     * @param { Model } model 
     * @param { Array } archetype 
     */
    constructor (model, archetype, onKey) {
        this.model = model
        this.archetype = archetype
        this.onKey = onKey
    }
}

export default class JoinModel {
    constructor (genesisModel, genesisArchetype) {
        this.$joinUnits = []
        this.genesisModel = genesisModel
        this.join(genesisModel, genesisArchetype)
    }
    /**
     * 
     * @param { Model } genesisModel 
     * @param { archetype } archetype
     */
    join (model, archetype) {
        return {
            on: (key) => {
                this.$joinUnits.push(new JoinUnit(model, archetype, key))
                return this
            }
        }
    }

    /**
     * 
     * @param { Model } model 
     */
    into (intoModel) {
        for (const joinUnit of this.$joinUnits) {
            const cloudFunction = Fireshot().forEachDocumentOf(joinUnit.model.collectionName)
                .onWrite((change, context) => {
                    const rawData = change.after.data()
                    const persistentData = this.$persistentData(rawData, joinUnit.archetype)

                    const { onKey } = joinUnit
                    
                    intoModel.collection.where(onKey, '==', rawData[onKey])
                        .get()
                        .then(snap => {
                            snap.forEach(joinedDoc => joinedDoc.update(persistentData))
                        })
                })

            Fireshot().$subscribe(`join__${joinUnit.model.collectionName}__into__${intoModel.collectionName}`, cloudFunction)
        }
    }

    
}
