"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const {getInfoData} = require("../utils");
const { ConflictRequestError } = require("../core/error.response");


class GiaoVienService {
    static getInfoGiaoVien  = async(msgv) => {
        const giaovien = await db.GiaoVien.findOne({
            where: {
                msgv
            },
        })

        if (!giaovien) {
            throw new ConflictRequestError("Errors: Giaovien Not Found");
        }

        return {
            code: 200,
            giaovien
          };
    }

    static getAllGiaoVien = async () => {
        const allGiaoVien = await db.GiaoVien.findAll();
        if (allGiaoVien?.length > 0) {
          return {
            code: 200,
            allGiaoVien,
          };
        }
        return {
          code: 200,
          metadata: null,
        };
      };
}


module.exports = GiaoVienService;