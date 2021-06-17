import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import PinsDAO from "./dao/pinsDAO.js"
import CohortsDAO from "./dao/cohortsDAO.js"
import UsersDAO from "./dao/usersDAO.js"
import PinnyDAO from "./dao/pinnyDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.URI,
        {
            poolSize: 100,
            wtimeout: 2500,
            useNewUrlParser: true 
        }
    )
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await PinsDAO.injectDB(client)
        await CohortsDAO.injectDB(client)
        await UsersDAO.injectDB(client)
        await PinnyDAO.injectDB(client)

        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })


