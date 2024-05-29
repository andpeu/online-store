

const {Cart , CartItems} = require('../models/models')
const ApiError = require('../error/ApiError');

class cartController {
    // // async create(req, res, next) {
    // //     try {
    // //         let {deviceId, amount} = req.body
    // //         const cartItems = await CartItems.create({deviceId, amount});

    // //         if (info) {
    // //             info = JSON.parse(info)
    // //             info.forEach(i =>
    // //                 DeviceInfo.create({
    // //                     title: i.title,
    // //                     description: i.description,
    // //                     deviceId: device.id
    // //                 })
    // //             )
    // //         }

    // //         return res.json(cartItems)
    // //     } catch (e) {
    // //         next(ApiError.badRequest(e.message))
    // //     }

    // // }
    // async getAll(req, res) {
    //     const types = await Cart.findAll()
    //     return res.json(types)
    // }
}

module.exports = new cartController()