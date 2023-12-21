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

    getAll = async (req, res) => {
        new SuccessResponse({
            metadata: await SinhVienService.getAllSinhVien()
        }).send(res)
    }

    updateStudent = async (req, res) => {
        const {mssv} = req.params
        const updateInfo = req.body

        new SuccessResponse({
            metadata: await SinhVienService.updateInfoStudent(mssv, updateInfo)
        }).send(res)
    }

    delete = async(req, res) => {
        const {mssv} = req.params
        new SuccessResponse({
            metadata: await SinhVienService.deleteSinhVien(mssv)
        }).send(res)
    }
}

module.exports = new SinhVienController()