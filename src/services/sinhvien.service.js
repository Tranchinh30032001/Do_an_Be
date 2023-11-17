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
}


module.exports = SinhVienService;