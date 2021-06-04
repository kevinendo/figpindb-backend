import express from "express"
import PinsController from "./pins.controller.js"

const router = express.Router()

router.route("/allPins").get(PinsController.apiGetPins)
router.route("/pins").get(PinsController.apiFind)
router.route("/calendar").get(PinsController.apiCalendar)
router.route("/pinDetail").get(PinsController.apiPinDetail)
router.route("/allCohorts").get(PinsController.apiAllCohorts)


export default router