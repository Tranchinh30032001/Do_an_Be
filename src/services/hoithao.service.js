"use strict";

const db = require("../models");
const { getInfoData } = require("../utils");
const { ConflictRequestError } = require("../core/error.response");
const { isArray } = require("lodash");

class HoiThaoService {
  static createHoiThao = async (body) => {
    const { hoithao_id, ten_hoithao, nguoi_chutri, des, ngay_batdau, ngay_ketthuc, lop } = body;


    const findHoiThao = await db.HoiThao.findOne({
      where: {
        hoithao_id,
      },
    });

    if (findHoiThao) {
      throw new ConflictRequestError("Errors: HoiThao already exist");
    }

    const start = new Date(ngay_batdau);
    const end = new Date(ngay_ketthuc);

    const newHoiThao = await db.HoiThao.create({
      hoithao_id,
      ten_hoithao,
      nguoi_chutri,
      des,
      ngay_batdau: start,
      ngay_ketthuc: end,
    });

    const students = await db.Student.findAll({
        where: {
            lop_id: lop
        }
    })
    const listMssv = students.map((item) => {
        return item.dataValues.mssv
    })

    const promises = listMssv?.map(mssv => {
        return db.StudentHoiThao.create({
          mssv,
          hoithao_id,
          isJoin: 0,
        });
      });

      await Promise.all(promises);

    if (newHoiThao) {
      return {
        code: 201,
        metadata: {
          lop: getInfoData({ fields: ["hoithao_id", "ten_hoithao"], object: newHoiThao }),
        },
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static getAllHoiThao = async () => {
    const allHoiThao = await db.HoiThao.findAll();
    if (allHoiThao?.length > 0) {
      return {
        code: 200,
        allHoiThao,
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static getHoiThao = async (hoithao_id) => {
    const hoiThao = await db.HoiThao.findOne({
      where: {
        hoithao_id,
      },
    });
    if (hoiThao) {
      return {
        code: 200,
        hoiThao,
      };
    }
    return {
      code: 200,
      metadata: null,
    };
  };

  static getHoiThaoSinhVien = async (mssv) => {
    const res = await db.StudentHoiThao.findOne({
      where: {
        mssv
      }
    })
    if (res) {
      return {
        res
      };
    }
    return {
      metadata: null,
    };
  }

}

module.exports = HoiThaoService;
