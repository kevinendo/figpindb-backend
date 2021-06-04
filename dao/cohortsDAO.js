import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let pins

export default class CohortsDAO {
  static async injectDB(conn) {
    if (pins) {
      return
    }
    try {
      pins = await conn.db(process.env.NS).collection("cohorts")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in cohortsDAO: ${e}`,
      )
    }
  }

static async allCohorts({
    filters = null,
  } = {}) {
    let query = { "number": { $eq: filters["number"] } }
    let mysort = { "edition": 1, "lot": 1}
    let myfields = { number: 1, name: 1, story_action_type: 1, edition: 1, lot: 1, volume: 1,  _id: 0}

    let cursor
    
    try {
      cursor = await pins
        .find(query).sort(mysort).project(myfields)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return {pinsList: []}
    }

    const displayCursor = cursor

    try {
      const pinsList = await displayCursor.toArray()
      const totalNumPins = await pins.countDocuments(query)

      return { pinsList }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { pinsList: []}
    }
  }

}

