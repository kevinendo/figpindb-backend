import express from "express"
import PinsController from "./pins.controller.js"
import PinnyController from "./pinny.controller.js"

const router = express.Router()

router.route("/figpindb/allPins").get(PinsController.apiGetPins)
router.route("/figpindb/pins").get(PinsController.apiFind)
router.route("/figpindb/calendar").get(PinsController.apiCalendar)
router.route("/figpindb/pinDetail").get(PinsController.apiPinDetail)
router.route("/figpindb/allCohorts").get(PinsController.apiAllCohorts)
router.route("/figpindb/user").get(PinsController.apiUserDetail)

router.route("/pinnydb/allPins").get(PinnyController.apiGetPins)
router.route("/pinnydb/pins").get(PinnyController.apiFind)
router.route("/pinnydb/pinDetail").get(PinnyController.apiPinDetail)


export default router