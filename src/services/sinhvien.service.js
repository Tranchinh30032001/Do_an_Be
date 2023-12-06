"use strict";

// const shopModel = require("../models/shop.model")
const db = require("../models");
const {getInfoData} = require("../utils");
const { ConflictRequestError } = require("../core/error.response");


class SinhVienService {
    static getInfoStudent  = async(mssv) => {
        const student = await db.Student.findOne({
            where: {
                mssv
            },
        })

        if (!student) {
            throw new ConflictRequestError("Errors: Student Not Found");
        }

        return {
            code: 200,
            student
          };
    }

    static getAllSinhVien = async () => {
        const allSinhVien = await db.Student.findAll();
        if (allSinhVien?.length > 0) {
          return {
            code: 200,
            allSinhVien,
          };
        }
        return {
          code: 200,
          metadata: null,
        };
      };
}


module.exports = SinhVienService;