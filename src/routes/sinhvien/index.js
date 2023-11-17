'use strict'

const express = require('express')
const sinhVienController = require('../../controllers/sinhvien.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require("../../middleware/verify-access-token")
const router = express.Router()


router.use(authentication)
router.get('/qldt/info/student/:mssv', asyncHandler(sinhVienController.getInfoStudent))

//authentication
// router.use(authentication)
// router.post('/shop/logout', asyncHandler(accessController.logout))


module.exports = router