// memanggil file model untuk pelanggaran
let modelPelanggaran = require("../models/index").pelanggaran

//import sequelize operator
let sequelize = require(`sequelize`)
let Op = sequelize.Op

exports.getDataPelanggaran = async(request, response) => { // variabel async digunakan ketika memakai await
    let dataPelanggaran = await modelPelanggaran.findAll() //biasanya menggunakan seperti inti hanya untuk get
    return response.json({
        Count : dataPelanggaran.length,
        Pelanggaran : dataPelanggaran
    })
}

exports.findPelanggaran = async(request, response) => {
    let keyword = request.body.keyword

    let dataPelanggaran = await modelPelanggaran.findAll({
        where : {
            [Op.or] : {
                nama_pelanggaran: {[Op.like]:`%${keyword}%`},
                poin: {[Op.like]:`%${keyword}%`}
            }
        }
    })

    return response.json(dataPelanggaran)
}


//untuk handle add data pelanggaran
exports.addDataPelanggaran = (request, response) => {
    // tampung data request
    let newPelanggaran = {
        nama_pelanggaran: request.body.nama_pelanggaran,
        poin: request.body.poin
    }
    modelPelanggaran.create(newPelanggaran)
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

//untuk handle edit data pelanggaran
exports.editDataPelanggaran = (request, response) => {
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

//untuk handle delete data pelanggaran
exports.deleteDataPelanggaran = (request, response) => {
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