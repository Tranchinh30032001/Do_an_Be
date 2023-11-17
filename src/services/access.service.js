"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const CredentialService = require("../services/credential")
const { createTokenPair, verifyJWT } = require("../auth/authUtils")
const { getInfoData } = require("../utils");
const { ConflictRequestError, BadRequestError, AuthFailureError } = require("../core/error.response");
// const { findByEmail } = require("./shop.service")
const bryct = require("bcrypt");


const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  static handlerRefreshToken = async (refreshToken) => {
    // check refresh token used
    // const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken)
    // if (foundToken) {
    //     //decode xem may la ai
    //     const { userId, email } = await verifyJWT(refreshToken, foundToken.privatekey)
    // }
  };

  static logout = async (keyStore) => {
    console.log("logunauthorized");
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);

    console.log("xoa roi: ", delKey);
    return delKey;
  };
  /*
        1-check email in db
        2-match password in db
        3-create PRT and PT and save
        4-generate tokens
        5-get data return login
    */
  static signIn = async ({ mssv, password, refreshToken = null }) => {
    const student = await db.Credential.findOne({
      where: {
        mssv
      }
    })

    const studentModel = await db.Student.findOne({
      where: {
        mssv
      }
    })

    if (!student) {
      throw new ConflictRequestError("Errors: Student Not Found");
    }

    const match = await bryct.compare(password, student.password);
    if (!match) throw new AuthFailureError('Authentication failed')
    const keyTokens = await db.Credential.findOne({
      where: {
        mssv
      }
  })
    const {publicKey, privateKey} = keyTokens;
    // // //4.generate tokens
    const { mssv: student_id} = student;
    const {role_id} = studentModel;
    const tokens = await createTokenPair({ student_id,  role_id}, publicKey, privateKey)
    return {
        student: getInfoData({ fields: ['mssv', 'ho_ten', 'role_id'], object: studentModel}),
        tokens
    }
  };
  static signUp = async (data) => {
    const {
      mssv,
      ho_ten,
      lop_id,
      ngay_sinh,
      nganh_id,
      que_quan,
      tinh_trang,
      gioi_tinh,
      avatar,
      email,
      phone,
      role_id
    } = data?.data;
    //step1: check email exists??
    const student = await db.Student.findOne({
      where: {
        mssv
      },
    })
    if (student) {
      throw new ConflictRequestError("Errors: Student already exists");
    }

    const passwordHash = await bcrypt.hash(ngay_sinh, 10);
    const ngay_sinh_date = new Date(ngay_sinh);
    const newStudent = await db.Student.create({
      mssv,
      ho_ten,
      lop_id,
      ngay_sinh: ngay_sinh_date,
      nganh_id,
      que_quan,
      tinh_trang,
      gioi_tinh,
      avatar,
      email,
      phone,
      role_id,
    });

    if (newStudent) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      await CredentialService.createCredential({
        mssv: newStudent.mssv,
        password: passwordHash,
        publicKey,
        privateKey,
      });

      return {
        code: 201,
        metadata: {
          shop: getInfoData({ fields: ["mssv", "name"], object: newStudent }),
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };
}

module.exports = AccessService;
