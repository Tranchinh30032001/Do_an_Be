'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const { handleRoleIdAdmin } = require('../../middleware/verify-access-token')
const router = express.Router()

router.post('/qldt/signup', asyncHandler(accessController.signUp))
router.post('/qldt/signin', asyncHandler(accessController.signIn))
router.post('/qldt/signup-giaovien', [handleRoleIdAdmin,asyncHandler(accessController.signUpGiaoVien)])
router.post('/qldt/signin-giaovien', asyncHandler(accessController.signInGiaoVien))

router.post("/qldt/encode-qr", asyncHandler(accessController.encodeQr))
router.post("/qldt/decode-qr", asyncHandler(accessController.decodeQr))


module.exports = router