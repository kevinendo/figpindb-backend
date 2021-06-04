import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let pins

export default class PinsDAO {
  static async injectDB(conn) {
    if (pins) {
      return
    }
    try {
      pins = await conn.db(process.env.NS).collection("pins")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in pinsDAO: ${e}`,
      )
    }
  }

  static async getPins({
    filters = null,
    page = 0,
    pinsPerPage = 50,
  } = {}) {
    let query
    let mysort = { "number_prefix": 1, "number_suffix": -1}
    let myfields = {"_id": 0, "number": 1, "name" :1, "img_url_med": 1}
    let cursor
    
    try {
      cursor = await pins
        .find(query).sort(mysort).project(myfields)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return {pinsList: []}
    }

    const displayCursor = cursor.limit(pinsPerPage).skip(pinsPerPage * page)

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

  static async find({
    filters = null,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      } else if ("property" in filters) {
        query = { "property": { $eq: filters["property"] } }
      } else if ("licensor" in filters) {
        query = { "licensor": { $eq: filters["licensor"] } }
      } else if ("number" in filters) {
        query = { "number": { $eq: filters["number"] } }
      } else if ("type" in filters) {
        query = { "type": { $eq: filters["type"] } }
      } else if ("tags" in filters) {
        query = { "tags": { $regex: filters["tags"] } }
      } else if ("availability" in filters) {
        query = { "availability": { $eq: filters["availability"] } }
      } else if ("variant" in filters) {
        query = { "variant": { $regex: filters["variant"] } }
      }
    }
    let mysort = { "number_prefix": 1, "number_suffix": -1}
    let myfields = {"_id": 0, "number": 1, "name" :1, "img_url_med": 1}
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

  static async calendar({
    filters = null,
  } = {}) {
    let query =  { $and: [ { "unlock_date": { $ne: "" } }, { "unlock_date": { $ne: "Pre-Order" } }, { "unlock_time": { $ne: "" } } ] }
    let mysort = { "unlock_date": 1, "unlock_time": 1}
    let myfields = {"_id": 0, "number": 1, "name" :1, "img_url_med": 1, "unlock_date": 1, "unlock_time": 1}
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

static async pinDetail({
    filters = null,
  } = {}) {
    let query = { "number": { $eq: filters["number"] } }
    let myfields = {"_id": 0}
    let cursor
    
    try {
      cursor = await pins
        .findOne(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return {pinsList: []}
    }

    const displayCursor = cursor

    try {
      const pinsList = await displayCursor
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

