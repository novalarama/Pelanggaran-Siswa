// memanggil file model untuk user
let modelUser = require("../models/index").user

exports.getDataUser = (request, response) => {
    modelUser.findAll()
        .then(result => {
            return response.json({
                Count : result.length,
                User : result
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

//untuk handle add data siswa
exports.addDataUser = (request, response) => {
    // tampung data request
    let newUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: request.body.password
    }
    modelUser.create(newUser)
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
exports.editDataUser = (request, response) => {
    let idUser = request.params.id_user
    let DataUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: request.body.password
    }
    // eksekusi 
    modelUser.update(DataUser, {where :{id_user:idUser}})
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
exports.deleteDataUser = (request, response) => {
    let idUser = request.params.id_user

    // eksekusi 
    modelUser.destroy({where :{id_user:idUser}})
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