'use strict'

const express = require('express')
const sinhVienController = require('../../controllers/sinhvien.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication, handleRoleIdGiaoVien} = require("../../middleware/verify-access-token")
const router = express.Router()


router.get('/qldt/info/student/:mssv', asyncHandler(sinhVienController.getInfoStudent))
router.use(handleRoleIdGiaoVien)
router.get('/qldt/all-sinhvien', [handleRoleIdGiaoVien ,asyncHandler(sinhVienController.getAll)])

//authentication
// router.use(authentication)
// router.post('/shop/logout', asyncHandler(accessController.logout))


module.exports = router