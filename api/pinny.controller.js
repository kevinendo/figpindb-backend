
import PinnyDAO from "../dao/pinnyDAO.js"

export default class PinnyController {
  static async apiGetPins(req, res, next) {
    const pinsPerPage = req.query.pinsPerPage ? parseInt(req.query.pinsPerPage, 10) : 100
    const page = req.query.page ? parseInt(req.query.page, 10) : 1

    let filters = {}
    if (req.query.pin_name) {
      filters.pin_name = req.query.name
    } else if (req.query.category) {
      filters.category = req.query.category
    } else if (req.query.property) {
      filters.property = req.query.property
    }

    const { pinsList } = await PinnyDAO.getPins({
      filters,
      page,
      pinsPerPage,
    })

    let response = pinsList   
    res.json(response)
  }

  static async apiFind(req, res, next) {
    let filters = {}
    if (req.query.pin_name) {
      filters.pin_name = req.query.pin_name
    } else if (req.query.category) {
      filters.category = req.query.category
    } else if (req.query.property) {
      filters.property = req.query.property
    } else if (req.query.company) {
        filters.company = req.query.company
    } else if (req.query.year) {
        filters.year = req.query.year
    } else if (req.query.tags) {
        filters.tags = req.query.tags
    } else if (req.query.type) {
        filters.type = req.query.type
    } else if (req.query.set) {
        filters.set = req.query.set
    } 

    const { pinsList } = await PinnyDAO.find({filters})

    let response = pinsList   
    res.json(response)
  }

  static async apiPinDetail(req, res, next) {
    let filters = {}
    if (req.query.pin_id) {
        filters.pin_id = req.query.pin_id
    }
    const { pinsList } = await PinnyDAO.pinDetail({filters})

    let response = pinsList   
    res.json(response)
  } 
  
}