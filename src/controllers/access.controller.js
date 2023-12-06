'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")



class AccessController {
    signIn = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.signIn(req.body)
        }).send(res)
    }
    signUp = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body),
        }).send(res)
    }

    signInGiaoVien = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.signInGiaoVien(req.body)
        }).send(res)
    }
    signUpGiaoVien = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUpGiaoVien(req.body),
        }).send(res)
    }
    logout = async (req, res) => {
        new SuccessResponse({
            message: 'Logout OK',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }
    encodeQr = async (req, res) => {
        const mssv = req.body
        new SuccessResponse({
            message: 'encode ok',
            metadata: await AccessService.encodeQr(mssv)
        }).send(res)
    }

    decodeQr = async (req, res) => {
        const encrypted = req.body
        new SuccessResponse({
            message: 'decode ok',
            metadata: await AccessService.decodeQr(encrypted)
        }).send(res)
    }
}

module.exports = new AccessController()