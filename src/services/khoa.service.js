"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const bcrypt = require("bcrypt");
const {getInfoData} = require("../utils");
const { ConflictRequestError } = require("../core/error.response");


class KhoaService {
    static createKhoa = async(body) => {

        const {khoa_id, ten_khoa} = body;


        const findKhoa = await db.Khoa.findOne({
            where: {
                khoa_id
            }
        })

        if (findKhoa) {
            throw new ConflictRequestError("Errors: Khoa already exist");
        }

        const newKhoa = await db.Khoa.create({
            khoa_id,
            ten_khoa,
        })


        if (newKhoa) {
            return {
                code: 201,
                metadata: {
                  lop: getInfoData({ fields: ["khoa_id", "ten_khoa"], object: newKhoa })
                },
              };
        }
        return {
            code: 200,
            metadata: null,
          };
    }

    static getAllKhoa = async() => {
        const allKhoa = await db.Khoa.findAll();
        if (allKhoa?.length > 0) {
            return {
                code: 200,
                allKhoa
              };
        }
        return {
            code: 200,
            metadata: null,
          };
    }
}


module.exports = KhoaService;