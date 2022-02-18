const detail_pelanggaran_siswa = require("../models/detail_pelanggaran_siswa")

// memanggil file model untuk pelanggaran
let modelPS = require("../models/index").pelanggaran_siswa
let modelDetailPS = require("../models/index").detail_pelanggaran_siswa

exports.getDataPelanggaranSiswa = async(request, response) => { // variabel async digunakan ketika memakai await
    let dataPelanggaran = await modelPelanggaran.findAll() //biasanya menggunakan seperti inti hanya untuk get
    return response.json({
        Count : dataPelanggaran.length,
        Pelanggaran : dataPelanggaran
    })
}

//untuk handle add data pelanggaran siswa
exports.addDataPelanggaranSiswa = (request, response) => {
    let newData = {
        waktu : request.data.waktu,
        id_siswa : request.data.id_siswa,
        id_user : request.data.id_user
    }
    // insert ke tabel pelanggaran_siswa
    modelPS.create(newData)
    .then(result => {
            let detailPS = request.body.detail_pelanggaran_siswa
            //asumsinya adl detail_pelanggaran_siswa bertipe array
            let id = result.id_pelanggaran_siswa
            for (let i = 0; i < detail_pelanggaran_siswa.length; i++) {
                detail_pelanggaran_siswa[i].id_pelanggaran_siswa = id
                
            }

            //insert ke tabel detail_pelanggaran_siswa
            modelDetailPS.bulkCreate(detail_pelanggaran_siswa) // menggunakan bulk karena bertipe array which is banyak data
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
    })
    .catch(error => {
        return response.json({
            message : error.message
        })
    })
}

//untuk handle edit data pelanggaran siswa
exports.editDataPelanggaranSiswa = (request, response) => {
    let idPelanggaran = request.params.id_pelanggaran
    let DataPelanggaran = {
        nama_pelanggaran: request.body.nama_pelanggaran,
        poin: request.body.poin
    }
    // eksekusi 
    modelPelanggaran.update(DataPelanggaran, {where :{id_pelanggaran:idPelanggaran}})
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

//untuk handle delete data pelanggaran siswa
exports.deleteDataPelanggaranSiswa = (request, response) => {
    let idPelanggaran = request.params.id_pelanggaran

    // eksekusi 
    modelPelanggaran.destroy({where :{id_pelanggaran:idPelanggaran}})
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