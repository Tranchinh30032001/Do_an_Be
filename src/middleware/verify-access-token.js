'use strict'
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError, } = require('../core/error.response')
const {jwtDecode} = require("jwt-decode")
const {ROLEID} = require("../utils/role")

const { findByUserId } = require("../services/credential")

const HEADER = {
    AUTHORIZATION: 'authorization',
    MSSV: 'mssv',
}

const handleRoleIdGiaoVien = asyncHandler(async(req, res, next) => {
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    const result = jwtDecode(accessToken)
    if (!accessToken) throw new AuthFailureError('Invalid request token')
    const {role_id} = result;
    if (role_id === ROLEID.GIAOVIEN || role_id === ROLEID.ADMIN) {
        next()
    }
    else {
        throw new AuthFailureError("Authentication failed")
    }
})

const handleRoleIdAdmin = asyncHandler(async(req, res, next) => {
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    const result = jwtDecode(accessToken)
    if (!accessToken) throw new AuthFailureError('Invalid request token')
    const {role_id} = result;
    if (role_id === ROLEID.ADMIN) {
        next()
    }
    else {
        throw new AuthFailureError("Authentication failed")
    }
})

const handleRoleIdSinhVien = asyncHandler(async (req, res, next) => {
    /*
    1- Check userId missing??
    2- get Access tokens
    3- verify Tokens
    4- check User in dbs
    5- check keyStore with this userId??
    6- Ok all => return next()
    */
    const mssv = req.headers[HEADER.MSSV]
    if (!mssv) throw new AuthFailureError('Invalid Student')

    const keyStore = await findByUserId(mssv)
    if (!keyStore) throw new NotFoundError('Not found keyStore')


    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError('Invalid request token')
    try {
        const decodeUser = jwt.verify(accessToken.split(' ')[1], keyStore.publicKey)
        if (mssv!== decodeUser.student_id) throw new AuthFailureError('Invalid userId')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret)
}

module.exports = {
    verifyJWT,
    handleRoleIdSinhVien,
    handleRoleIdGiaoVien,
    handleRoleIdAdmin
}