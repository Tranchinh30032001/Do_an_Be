'use strict'

const express = require('express')
const lopController = require('../../controllers/lop.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { handleRoleIdGiaoVien, handleRoleIdAdmin } = require('../../middleware/verify-access-token')
// const { authentication } = require('../../auth/authUtils')
const router = express.Router()


router.post('/qldt/create-class', [ handleRoleIdAdmin,asyncHandler(lopController.createClass)])

router.get('/qldt/class/:lop_id', [handleRoleIdGiaoVien,asyncHandler(lopController.getClass)])
router.use(handleRoleIdGiaoVien)
router.get('/qldt/all-class', [handleRoleIdGiaoVien,asyncHandler(lopController.getAllClass)])
//authentication
// router.use(authentication)
// router.post('/shop/logout', asyncHandler(accessController.logout))


module.exports = router