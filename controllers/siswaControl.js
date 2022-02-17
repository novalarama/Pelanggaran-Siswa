// memanggil file model untuk siswa
let modelSiswa = require("../models/index").siswa

exports.getDataSiswa = (request, response) => {
    modelSiswa.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                Siswa : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

//untuk handle add data siswa
exports.addDataSiswa = (request, response) => {
    // tampung data request
    let newSiswa = {
        nis: request.body.nis,
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin
    }
    modelSiswa.create(newSiswa)
    .then(result => {
        return response.json({
            message : `Data has been inserted`
        })
    })
    .catch(error => {
        return response.json({
            message: error.message
        })
    })
}

//untuk handle edit data siswa
exports.editDataSiswa = (request, response) => {
    let idSiswa = request.params.id_siswa
    let dataSiswa = {
        nis : request.body.nis,
        nama : request.body.nama,
        kelas : request.body.kelas,
        poin : request.body.poin
    }
    // eksekusi 
    modelSiswa.update(dataSiswa, {where :{id_siswa:idSiswa}})
    .then(result => {
        return response.json({
            message : `Data has been updated`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

//untuk handle delete data siswa
exports.deleteDataSiswa = (request, response) => {
    let idSiswa = request.params.id_siswa

    // eksekusi 
    modelSiswa.destroy({where :{id_siswa:idSiswa}})
    .then(result => {
        return response.json({
            message : `Data has been deleted`
        })
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}