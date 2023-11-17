'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const SinhVienService = require("../services/sinhvien.service")


class SinhVienController {
    getInfoStudent = async (req, res) => {
        const {mssv} = req.params
        new SuccessResponse({
            metadata: await SinhVienService.getInfoStudent(mssv)
        }).send(res)
    }
}

module.exports = new SinhVienController()