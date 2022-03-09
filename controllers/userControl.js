const md5 = require("md5")
let jwt = require(`jsonwebtoken`)
const{validationResult} = require(`express-validator`)

// memanggil file model untuk user
let modelUser = require("../models/index").user

//import sequelize operator
let sequelize = require(`sequelize`)
let Op = sequelize.Op

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

exports.findUser = async(request, response) => {
    let keyword = request.body.keyword

    let dataUser = await modelUser.findAll({
        where : {
            [Op.or] : {
                username: {[Op.like]:`%${keyword}%`},
                nama_user: {[Op.like]:`%${keyword}%`}
            }
        }
    })

    return response.json(dataUser)
}

//untuk handle add data siswa
exports.addDataUser = (request, response) => {
    let error = validationResult(request)
    if(!error.isEmpty()){
        return response.json(error.array())
    }

    // tampung data request
    let newUser = {
        nama_user: request.body.nama_user,
        username: request.body.username,
        password: md5(request.body.password)
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
    modelUser.update(DataUser, {where : idUser})
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
    modelUser.destroy({where : idUser})
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

exports.authentication = async(request, response) => {
    let data = {
        username : request.body.username,
        password : md5(request.body.password)
    }

    // validasi
    let result = await modelUser.findOne({where : data})

    if (result) {
        // data ditemukan

        // payload adalah data yang akan dienkripsi
        let payload = JSON.stringify(result) // untuk mengubah data objek ke json

        let secretKey = `Pelanggaran Siswa`

        // generate token
        let token = jwt.sign(payload, secretKey)
        return response.json({
            logged: true,
            token: token
        })
    } else {
        // data tidak ditemukan
        return response.json({
            logged: false,
            message : `Invalid Username or Password, Please Try Again!`
        })
    }
}