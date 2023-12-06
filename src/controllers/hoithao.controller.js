'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const HoiThaoService = require("../services/hoithao.service")
console.log("hoi thao");

class HoiThaoController {
    createHoiThao = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await HoiThaoService.createHoiThao(req.body),
        }).send(res)
    }
    getAllHoiThao = async (req, res) => {
        new SuccessResponse({
            metadata: await HoiThaoService.getAllHoiThao()
        }).send(res)
    }

    getHoiThao = async (req, res) => {
        const {hoithao_id} = req.params;
        new SuccessResponse({
            metadata: await HoiThaoService.getHoiThao(hoithao_id)
        }).send(res)
    }

    getHoiThaoSinhVien = async (req, res) => {
        const {mssv} = req.params;
        new SuccessResponse({
            metadata: await HoiThaoService.getHoiThaoSinhVien(mssv)
        }).send(res)
    }
}

module.exports = new HoiThaoController()