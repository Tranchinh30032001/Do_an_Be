'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const LopService = require("../services/lop.service")


class LopController {
    createClass = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await LopService.createClass(req.body),
        }).send(res)
    }

    getAllClass = async (req, res) => {
        new SuccessResponse({
            metadata: await LopService.getAllClass()
        }).send(res)
    }

    getClass = async (req, res) => {
        const {lop_id} = req.params;
        console.log({lop_id});
        new SuccessResponse({
            metadata: await LopService.getClass(lop_id)
        }).send(res)
    }
}

module.exports = new LopController()