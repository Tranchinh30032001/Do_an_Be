'use strict'

const express = require('express')
const sinhVienController = require('../../controllers/sinhvien.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const {  handleRoleIdGiaoVien} = require("../../middleware/verify-access-token")
const router = express.Router()


router.get('/qldt/info/student/:mssv', asyncHandler(sinhVienController.getInfoStudent))
router.get('/qldt/all-sinhvien', [handleRoleIdGiaoVien ,asyncHandler(sinhVienController.getAll)])
router.post('/qldt/update/student/:mssv', [handleRoleIdGiaoVien ,asyncHandler(sinhVienController.updateStudent)])
router.post('/qldt/delete/student:/mssv', [handleRoleIdGiaoVien ,asyncHandler(sinhVienController.delete)])



module.exports = router