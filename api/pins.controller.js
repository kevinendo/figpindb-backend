
import PinsDAO from "../dao/pinsDAO.js"
import CohortsDAO from "../dao/cohortsDAO.js"
import UsersDAO from "../dao/usersDAO.js"

export default class PinsController {
  static async apiGetPins(req, res, next) {
    const pinsPerPage = req.query.pinsPerPage ? parseInt(req.query.pinsPerPage, 10) : 50
    const page = req.query.page ? parseInt(req.query.page, 10) : 1

    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    } else if (req.query.property) {
      filters.property = req.query.property
    } else if (req.query.licensor) {
      filters.licensor = req.query.licensor
    }

    const { pinsList } = await PinsDAO.getPins({
      filters,
      page,
      pinsPerPage,
    })

    let response = pinsList   
    res.json(response)
  }

  static async apiFind(req, res, next) {
    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    } else if (req.query.property) {
      filters.property = req.query.property
    } else if (req.query.licensor) {
      filters.licensor = req.query.licensor
    } else if (req.query.number) {
        filters.number = req.query.number
    } else if (req.query.type) {
        filters.type = req.query.type
    } else if (req.query.tags) {
        filters.tags = req.query.tags
    } else if (req.query.availability) {
        filters.availability = req.query.availability
    } else if (req.query.variant) {
        filters.variant = req.query.variant
    } 

    const { pinsList } = await PinsDAO.find({filters})

    let response = pinsList   
    res.json(response)
  }

  static async apiCalendar(req, res, next) {
 
    const { pinsList } = await PinsDAO.calendar({})

    let response = pinsList   
    res.json(response)
  }

  static async apiPinDetail(req, res, next) {
    let filters = {}
    if (req.query.number) {
        filters.number = req.query.number
    }
    const { pinsList } = await PinsDAO.pinDetail({filters})

    let response = pinsList   
    res.json(response)
  } 
  
  static async apiAllCohorts(req, res, next) {
    let filters = {}
    if (req.query.number) {
        filters.number = req.query.number
    }
    const { pinsList } = await CohortsDAO.allCohorts({filters})

    let response = pinsList   
    res.json(response)
  }   

  static async apiUserDetail(req, res, next) {
    let filters = {}
    if (req.query.display_name) {
        filters.display_name = req.query.display_name
    } else if  (req.query.user_id) {
      filters.user_id = req.query.user_id
  }
    const { pinsList } = await UsersDAO.userDetail({filters})

    let response = pinsList   
    res.json(response)
  } 

}