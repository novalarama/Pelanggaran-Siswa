// memanggil file model untuk siswa
let modelSiswa = require("../models/index").siswa

let path = require("path")
let fs =  require("fs")

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
    if(!request.file){
        return response.json({
            message : `nothing to upload`
        })
    }
    // tampung data request
    let newSiswa = {
        nis: request.body.nis,
        nama: request.body.nama,
        kelas: request.body.kelas,
        poin: request.body.poin,
        image: request.file.filename
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
exports.editDataSiswa = async(request, response) => {
    let idSiswa = request.params.id_siswa
    let dataSiswa = {
        nis : request.body.nis,
        nama : request.body.nama,
        kelas : request.body.kelas,
        poin : request.body.poin
    }
    if (request.file) {
        // jika edit menyertakan file gambar
        let siswa = await modelSiswa.findOne({ where: { id_siswa: idSiswa } })
        let oldFileName = siswa.image

        // delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))

        // menyisipkan nama file baru ke dalam objek dataSiswa
        dataSiswa.image = request.file.filename
    }

    modelSiswa.update(dataSiswa, { where: { id_siswa: id } })
        .then(result => {
            return response.json({
                message: `Data siswa berhasil diubah`
            })
        })
        .catch(error => {
            return response.json({
                message: error.message
            })
        })
}

//untuk handle delete data siswa
exports.deleteDataSiswa = async(request, response) => {
    let idSiswa = request.params.id_siswa

    //ambil dulu data filename yang akan dihapus
    let siswa = await modelSiswa.findOne({where: {id_siswa: idSiswa}})
    if(siswa){
        let oldFileName = siswa.image

        //delete file
        let location = path.join(__dirname, "../image", oldFileName)
        fs.unlink(location, error => console.log(error))
    }

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