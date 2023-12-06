"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const bcrypt = require("bcrypt");
const {getInfoData} = require("../utils");
const { ConflictRequestError } = require("../core/error.response");


class LopService {
    static createClass = async(body) => {

        const {lop_id ,ten_lop, so_sinh_vien_max, msgv} = body;


        const findLop = await db.Lop.findOne({
            where: {
                lop_id
            }
        })

        if (findLop) {
            throw new ConflictRequestError("Errors: Lop already exist");
        }

        const newLop = await db.Lop.create({
            lop_id,
            ten_lop,
            so_sinh_vien_max,
            msgv
        })


        if (newLop) {
            return {
                code: 201,
                metadata: {
                  lop: getInfoData({ fields: ["lop_id", "ten_lop"], object: newLop })
                },
              };
        }
        return {
            code: 200,
            metadata: null,
          };
    }

    static getAllClass = async() => {
        const allClass = await db.Lop.findAll();
        if (allClass?.length > 0) {
            return {
                code: 200,
                allClass
              };
        }
        return {
            code: 200,
            metadata: null,
          };
    }

    static getClass = async(lop_id) => {
        const lop = await db.Lop.findOne({
            where: {
                lop_id
            }
        });
        if (lop) {
            return {
                code: 200,
                lop
              };
        }
        return {
            code: 200,
            metadata: null,
          };
        }
}


module.exports = LopService;