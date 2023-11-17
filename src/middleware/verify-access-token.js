'use strict'
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError, } = require('../core/error.response')

const { findByUserId } = require("../services/credential")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    MSSV: 'mssv',
}

const authentication = asyncHandler(async (req, res, next) => {
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
        console.log({decodeUser});
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
    authentication,
    verifyJWT
}