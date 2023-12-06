'use strict'

const express = require('express')
const khoaController = require('../../controllers/khoa.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { handleRoleIdAdmin, handleRoleIdGiaoVien } = require('../../middleware/verify-access-token')
const router = express.Router()

router.post('/qldt/create-khoa', [handleRoleIdAdmin, asyncHandler(khoaController.createKhoa)])
router.get('/qldt/all-khoa',[ handleRoleIdGiaoVien, asyncHandler(khoaController.getAllKhoa)])


module.exports = router