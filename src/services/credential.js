'use strict'
const db = require("../models")

class CredentialService {
    static createCredential = async ({ mssv, password, publicKey, privateKey}) => {
        try {
            const tokens = await db.Credential.create({
                mssv,
                password,
                publicKey,
                privateKey,
            })

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static createCredentialGiaoVien = async ({ msgv, password, publicKey, privateKey}) => {
        try {
            const tokens = await db.CredentialGiaoVien.create({
                msgv,
                password,
                publicKey,
                privateKey,
            })

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (mssv) => {
        const res = await db.Credential.findOne({
            where: {
                mssv
            }
        })
        return res;
    }

    // static removeKeyById = async (userId) => {
    //     return await CredentialModel.deleteOne({ user: userId })
    // }

    // static findByRefreshTokenUsed = async (refreshToken) => {
    //     return await CredentialModel.findOne({ refreshTokensUsed: refreshToken })
    // }
}

module.exports = CredentialService