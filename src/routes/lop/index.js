'use strict'

const express = require('express')
const lopController = require('../../controllers/lop.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
// const { authentication } = require('../../auth/authUtils')
const router = express.Router()


router.post('/qldt/create-class', asyncHandler(lopController.createClass))

router.get('/qldt/all-class', asyncHandler(lopController.getAllClass))
router.get('/qldt/class/:lop_id', asyncHandler(lopController.getAllClass))

//authentication
// router.use(authentication)
// router.post('/shop/logout', asyncHandler(accessController.logout))


module.exports = router