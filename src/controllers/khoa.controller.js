'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const KhoaService = require("../services/khoa.service")

class KhoaController {
    createKhoa = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await KhoaService.createKhoa(req.body),
        }).send(res)
    }
    getAllKhoa = async (req, res) => {
        new SuccessResponse({
            metadata: await KhoaService.getAllKhoa()
        }).send(res)
    }
}

module.exports = new KhoaController()