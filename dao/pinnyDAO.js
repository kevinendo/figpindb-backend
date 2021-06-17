import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let pins

export default class PinnyDAO {
  static async injectDB(conn) {
    if (pins) {
      return
    }
    try {
      pins = await conn.db(process.env.NSX).collection("pinnydb")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in pinsDAO: ${e}`,
      )
    }
  }

  static async getPins({
    filters = null,
    page = 1,
    pinsPerPage = 100,
  } = {}) {
    let query
    let mysort = { "pin_id": -1, "number_suffix": -1}
    let myfields = { "pin_id": 1, "pin_name": 1, "category": 1, "set": 1, "main_img": 1, "_id": 0}
    let cursor
    
    try {
      cursor = await pins
        .find(query).sort(mysort).project(myfields)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return {pinsList: []}
    }

    const displayCursor = cursor.limit(pinsPerPage).skip(pinsPerPage * (page-1))

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
      if ("pin_name" in filters) {
        query = { $text: { $search: filters["pin_name"] } }
      } else if ("category" in filters) {
        query = { "category": { $eq: filters["category"] } }
      } else if ("property" in filters) {
        query = { "property": { $eq: filters["property"] } }
      } else if ("company" in filters) {
        query = { "company": { $regex: filters["company"] } }
      } else if ("year" in filters) {
        query = { "year": { $regex: filters["year"] } }
      } else if ("tags" in filters) {
        query = { "tags": { $regex: filters["tags"] } }
      } else if ("type" in filters) {
        query = { "type": { $regex: filters["type"] } }
      } else if ("set" in filters) {
        query = { "set": { $regex: filters["set"] } }
      }
    }
    let mysort = { "pin_id": -1 }
    let myfields = { "pin_id": 1, "pin_name": 1, "category": 1, "set": 1, "main_img": 1, "_id": 0}
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
    let query = { "pin_id": { $eq: Number(filters["pin_id"]) } }
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

      return { pinsList }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { pinsList: []}
    }
  }

}

