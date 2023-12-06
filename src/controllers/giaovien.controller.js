'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const GiaoVienService = require("../services/giaovien.service")

class GiaoVienController {
    signIn = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.signInGiaoVien(req.body)
        }).send(res)
    }
    signUp = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUpGiaoVien(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }

    getInfoGiaoVien = async (req, res) => {
        const { msgv } = req.params;
        new SuccessResponse({
            metadata: await GiaoVienService.getInfoGiaoVien(msgv)
        }).send(res)
    }

    getAll = async (req, res) => {
        new SuccessResponse({
            metadata: await GiaoVienService.getAllGiaoVien()
        }).send(res)
    }

    logout = async (req, res) => {
        new SuccessResponse({
            message: 'Logout OK',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }
}

module.exports = new GiaoVienController()