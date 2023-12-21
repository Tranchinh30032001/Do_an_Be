"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const CredentialService = require("../services/credential");
const { createTokenPair, verifyJWT } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { ConflictRequestError, BadRequestError, AuthFailureError } = require("../core/error.response");
// const { findByEmail } = require("./shop.service")
const bryct = require("bcrypt");
const SinhVienService = require("./sinhvien.service");
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");
require("dotenv").config();
const { cryptoWaitReady } = require("@polkadot/util-crypto");

//0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a

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
    const delKey = await KeyTokenService.removeKeyById(keyStore._id);

    return delKey;
  };

  static signIn = async ({ mssv, password, refreshToken = null }) => {
    const student = await db.Credential.findOne({
      where: {
        mssv,
      },
    });

    const studentModel = await db.Student.findOne({
      where: {
        mssv,
      },
    });
    if (!student) {
      throw new ConflictRequestError("Errors: Student Not Found");
    }

    const match = await bryct.compare(password, student.password);
    if (!match) throw new AuthFailureError("Authentication failed");
    const keyTokens = await db.Credential.findOne({
      where: {
        mssv,
      },
    });
    const { publicKey, privateKey } = keyTokens;
    // // //4.generate tokens
    const { mssv: student_id } = student;
    const { role_id } = studentModel;
    const tokens = await createTokenPair({ student_id, role_id }, publicKey, privateKey);
    return {
      student: getInfoData({ fields: ["mssv", "ho_ten", "role_id"], object: studentModel }),
      tokens,
    };
  };
  static signUp = async (data) => {
    const {
      mssv,
      ho_ten,
      lop_id,
      ngay_sinh,
      khoa_id,
      que_quan,
      tinh_trang,
      gioi_tinh,
      avatar,
      email,
      phone,
      role_id,
      cccd,
    } = data?.data;

    let hash = null;

    await cryptoWaitReady();
    const keyring = new Keyring({ type: "sr25519" });
    const alice = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
    const admin = keyring.addFromUri("0xe5be9a5092b81bca64be81d212e7f2f9eba183bb7a90954f7b76361f6edb5c0a");
    const wsProvider = new WsProvider("ws://127.0.0.1:9944");
    const api = await ApiPromise.create({ provider: wsProvider });
    const create_student = api.tx.student.createStudent(
      alice,
      mssv,
      ho_ten,
      lop_id,
      khoa_id,
      ngay_sinh,
      email,
      role_id,
      que_quan,
      cccd
    );
    api.tx.sudo.sudo(create_student).signAndSend(admin, ({ events = [], status }) => {
      console.log("Proposal status:", status.type);
      if (status.isInBlock) {
        hash = status.asInBlock.toHex();
      } else if (status.isFinalized) {
        console.log("Finalized block hash", status.asFinalized.toHex());
      }
    });
    const student = await db.Student.findOne({
      where: {
        mssv,
      },
    });
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
      khoa_id,
      que_quan,
      tinh_trang,
      gioi_tinh,
      avatar,
      email,
      phone,
      role_id,
      cccd,
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
          data: getInfoData({ fields: ["mssv", "name"], object: newStudent }),
          hash,
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static signUpGiaoVien = async (data) => {
    const { msgv, ho_ten, ngay_sinh, gioi_tinh, que_quan, email, phone, khoa_id, avatar, role_id, trinh_do, cccd } =
      data?.data;
    //step1: check email exists?
    const giaovien = await db.GiaoVien.findOne({
      where: {
        msgv,
      },
    });
    if (giaovien) {
      throw new ConflictRequestError("Errors: GiaoVien already exists");
    }

    const passwordHash = await bcrypt.hash(ngay_sinh, 10);
    const ngay_sinh_date = new Date(ngay_sinh);
    const newGiaoVien = await db.GiaoVien.create({
      msgv,
      ho_ten,
      ngay_sinh: ngay_sinh_date,
      gioi_tinh,
      que_quan,
      email,
      phone,
      khoa_id,
      avatar,
      role_id,
      trinh_do,
      cccd,
    });

    if (newGiaoVien) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");

      await CredentialService.createCredentialGiaoVien({
        msgv: newGiaoVien.msgv,
        password: passwordHash,
        publicKey,
        privateKey,
      });

      return {
        code: 201,
        metadata: {
          giaovien: getInfoData({ fields: ["msgv", "ho_ten"], object: newGiaoVien }),
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static signInGiaoVien = async ({ msgv, password, refreshToken = null }) => {
    const giaovien = await db.CredentialGiaoVien.findOne({
      where: {
        msgv,
      },
    });
    const giaovienModel = await db.GiaoVien.findOne({
      where: {
        msgv,
      },
    });

    if (!giaovien) {
      throw new ConflictRequestError("Errors: GiaoVien Not Found");
    }

    const match = await bryct.compare(password, giaovien.password);
    if (!match) throw new AuthFailureError("Authentication failed");
    const keyTokens = await db.CredentialGiaoVien.findOne({
      where: {
        msgv,
      },
    });
    const { publicKey, privateKey } = keyTokens;
    // // //4.generate tokens
    const { msgv: giaovien_id } = giaovien;
    const { role_id } = giaovienModel;
    console.log("uuuu");

    const tokens = await createTokenPair({ giaovien_id, role_id }, publicKey, privateKey);
    return {
      giaovien: getInfoData({ fields: ["msgv", "ho_ten", "role_id"], object: giaovienModel }),
      tokens,
    };
  };

  static encodeQr = async ({ mssv }) => {
    const res = await SinhVienService.getInfoStudent(mssv);
    const data = res.student.dataValues;
    const plaintext = data.mssv + "/" + data.ho_ten + "/" + data.lop_id + "/" + data.khoa_id;
    const key = Buffer.from("tranchinhlong123", "utf-8");
    const iv = Buffer.from("0000000000000000", "utf-8");
    const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
    let encrypted = cipher.update(plaintext, "utf-8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  };

  static decodeQr = async ({ encrypted }) => {
    const key = Buffer.from("tranchinhlong123", "utf-8");
    const iv = Buffer.from("0000000000000000", "utf-8");
    const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
    let decrypted = decipher.update(encrypted, "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return decrypted;
  };
}

module.exports = AccessService;
