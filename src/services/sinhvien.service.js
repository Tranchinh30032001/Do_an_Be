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

      static updateInfoStudent = async (mssv, updateInfo) => {
        try {
          const result = await db.Student.update(updateInfo, {
            where: {mssv}
          })
          if (result[0] > 0) {
            const updatedSinhVien = result[1][0];
             return {
              code: 200,
              updatedSinhVien,
            };
  
          } else {
            throw new ConflictRequestError("Errors: Student Not Found");
          }
        } catch (error) {
          throw new Error(error)
        }
      }
      static deleteSinhVien = async(mssv) => {
        try {
          const result = await SinhVien.destroy({
            where: { mssv: mssv },
          });
          if (result > 0) {
            return {
              code: 200,
              mssv,
            };
          } else {
            console.log('Không tìm thấy sinh viên để xóa.');
          }
        } catch (error) {
          throw new ConflictRequestError("Errors: Student Not Found");
        }
      }
}


module.exports = SinhVienService;