'use strict'

const express = require('express')
const giaoVienController = require('../../controllers/giaovien.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { handleRoleIdAdmin, handleRoleIdGiaoVien } = require('../../middleware/verify-access-token')
const router = express.Router()


router.get('/qldt/all-giaovien', [handleRoleIdAdmin,asyncHandler(giaoVienController.getAll)])

router.get('/qldt/info/giaovien/:msgv', [handleRoleIdGiaoVien,asyncHandler(giaoVienController.getInfoGiaoVien)])

//authentication
// router.use(authentication)
// router.post('/shop/logout', asyncHandler(accessController.logout))


module.exports = router