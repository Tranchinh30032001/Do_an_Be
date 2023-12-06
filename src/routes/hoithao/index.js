'use strict'

const express = require('express')
const hoiThaoController = require('../../controllers/hoithao.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { handleRoleIdAdmin, handleRoleIdGiaoVien, handleRoleIdSinhVien } = require('../../middleware/verify-access-token')
const router = express.Router()


router.post('/qldt/create-hoithao', [handleRoleIdAdmin,asyncHandler(hoiThaoController.createHoiThao)])

router.get('/qldt/all-hoithao', [handleRoleIdGiaoVien,asyncHandler(hoiThaoController.getAllHoiThao)])
router.get('/qldt/hoithao/:hoithao_id', [handleRoleIdSinhVien, asyncHandler(hoiThaoController.getHoiThao)])
router.get('/qldt/hoithao-sinhvien/:mssv', [handleRoleIdSinhVien,asyncHandler(hoiThaoController.getHoiThaoSinhVien)])


module.exports = router