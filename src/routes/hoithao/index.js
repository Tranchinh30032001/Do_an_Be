'use strict'

const express = require('express')
const hoiThaoController = require('../../controllers/hoithao.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const router = express.Router()


router.post('/qldt/create-hoithao', asyncHandler(hoiThaoController.createHoiThao))

router.get('/qldt/all-hoithao', asyncHandler(hoiThaoController.getAllHoiThao))
router.get('/qldt/hoithao/:hoithao_id', asyncHandler(hoiThaoController.getHoiThao))
router.get('/qldt/hoithao-sinhvien/:mssv', asyncHandler(hoiThaoController.getHoiThaoSinhVien))


module.exports = router