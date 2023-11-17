'use strict'

const express = require('express')
// const { apiKey, permission } = require('../auth/checkauth')
const router = express.Router()
//check apiKey
// router.use(apiKey)
// check permissions
// router.use(permission('0000'))
//redirect
router.use('/api/v1', require('./access'))
router.use('/api/v1', require('./lop'))
router.use('/api/v1', require('./hoithao'))
router.use('/api/v1', require('./sinhvien'))

module.exports = router