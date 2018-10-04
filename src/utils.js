import { pick } from 'lodash-es'

export function getPersistentData (rawData, archetype) {
    return archetype
        ? pick(rawData, archetype)
        : rawData
}
