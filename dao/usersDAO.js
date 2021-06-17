import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID
let pins

export default class UsersDAO {
  static async injectDB(conn) {
    if (pins) {
      return
    }
    try {
      pins = await conn.db(process.env.NS).collection("users")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`,
      )
    }
  }

static async userDetail({
    filters = null,
  } = {}) {
    let query = { "display_name": { $eq: filters["display_name"] } }


    if ("user_id" in filters) {
        query = { "user_id": { $eq: filters["user_id"] } }
      } else if ("display_name" in filters) {
        query = { "display_name": { $eq: filters["display_name"] } }
      }

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

