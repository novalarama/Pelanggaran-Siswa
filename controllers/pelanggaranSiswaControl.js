const detail_pelanggaran_siswa = require("../models/detail_pelanggaran_siswa");

// memanggil file model untuk pelanggaran
let modelPS = require("../models/index").pelanggaran_siswa;
let modelDetailPS = require("../models/index").detail_pelanggaran_siswa;
let siswaModel = require("../models/index").siswa
let pelanggaranModel = require("../models/index").pelanggaran

//import sequelize operator
let sequelize = require(`sequelize`)
let Op = sequelize.Op

exports.getDataPelanggaranSiswa = async (request, response) => {
  // variabel async digunakan ketika memakai await
  let dataPelanggaran = await modelPS.findAll({
    include: [
      "siswa",
      "user",
      {
        model: modelDetailPS,
        as: "detail_pelanggaran_siswa",
        include: ["pelanggaran"],
      }
    ],
    
  }); //biasanya menggunakan seperti inti hanya untuk get
  return response.json({
    Count: dataPelanggaran.length,
    Pelanggaran: dataPelanggaran,
  });
};

exports.filterPS = async(request, response) => {
  // filter tanggal awal dan akhir
  let start = request.body.start // tgl awal
  let end = request.body.end // tgl akhir

  let dataPS = await modelPS.findAll({
    include: [
      "siswa",
      "user",
      {
        model: modelDetailPS,
        as: "detail_pelanggaran_siswa",
        include: ["pelanggaran"],
      }
    ],
    where: {
      waktu: {[Op.between]:[start, end]}
    }
  }); 
  return response.json(dataPS)
}

//untuk handle add data pelanggaran siswa
exports.addDataPelanggaranSiswa = async(request, response) => {
  // proses pengurangan
  // 1. Mengambil nilai poin siswa dari tabe; siswa
  let siswa = await siswaModel.findOne({
    where: {id_siswa: request.body.id_siswa}
  })
  let poinSiswa = siswa.poin
  // 2. Mengambil nilai poin dari tiap pelanggarannya
  let detail = request.body.detail_pelanggaran_siswa
  let jumlahPoin = 0
  for (let i = 0; i < detail.length; i++) {
    // ambil poin dari tiap pelanggaran
    let pelanggaran = await pelanggaranModel.findOne({
      where : {id_pelanggaran: detail[i].id_pelanggaran}
    })
    let poinPelanggaran = pelanggaran.poin
    jumlahPoin += poinPelanggaran
  }
  // 3. Poin siswa dikurangi jumlah poin pelanggarannya
  let newPoin = poinSiswa - jumlahPoin
  // 4 . update poin siswa nya
  await siswaModel.update({
    poin : newPoin
  },
  {where : {id_siswa: request.body.id_siswa}}
  )

  //proses insert
  let newData = {
    waktu: request.body.waktu,
    id_siswa: request.body.id_siswa,
    id_user: request.body.id_user,
  };
  // insert ke tabel pelanggaran_siswa
  modelPS
    .create(newData)
    .then(result => {
      let detailPS = request.body.detail_pelanggaran_siswa;
      //asumsinya adl detail_pelanggaran_siswa bertipe array
      let id = result.id_pelanggaran_siswa;
      for (let i = 0; i < detailPS.length; i++) {
        detailPS[i].id_pelanggaran_siswa = id;
      }

      //insert ke tabel detail_pelanggaran_siswa
      modelDetailPS
        .bulkCreate(detailPS) // menggunakan bulk karena bertipe array which is banyak data
        .then(result => {
          return response.json({
            message: `Data has been inserted`,
          });
        })
        .catch(error => {
          return response.json({
            message: error.message,
          });
        });
    })
    .catch(error => {
      return response.json({
        message: error.message,
      });
    });
};

//untuk handle edit data pelanggaran siswa
exports.editDataPelanggaranSiswa = async(request, response) => {
  let id = request.params.id_pelanggaran_siswa;
  let DataPelanggaran = {
    waktu: request.body.waktu,
    id_siswa: request.body.id_siswa,
    id_user: request.body.id_user,
  };
  // eksekusi
  modelPS
    .update(DataPelanggaran, { where: { id_pelanggaran_siswa: id } })
    .then(async(result) => {
      // ada 2 detail -> 1 detail
      // hapus data detail yang lama
      // step 1 : hapus semua detail berdasarkan id_pelanggaran_siswa
      await modelDetailPS.destroy({
        where: {
          id_pelanggaran_siswa: request.params.id_pelanggaran_siswa,
        },
      });

      // step 2: insert data detail terbaru
      let detail_pelanggaran_siswa = request.body.detail_pelanggaran_siswa
      let id = result.id_pelanggaran_siswa;
      for (let i = 0; i < detailPS.length; i++) {
        detailPS[i].id_pelanggaran_siswa = id;
      }

      //insert ke tabel detail_pelanggaran_siswa
      modelDetailPS
        .bulkCreate(detailPS) // menggunakan bulk karena bertipe array which is banyak data
        .then(result => {
          return response.json({
            message: `Data has been inserted`,
          });
        })
        .catch(error => {
          return response.json({
            message: error.message,
          });
        });
    })
    .catch(error => {
      return response.json({
        message: error.message,
      });
    });
};

//untuk handle delete data pelanggaran siswa
exports.deleteDataPelanggaranSiswa = (request, response) => {
  let id = request.params.id_pelanggaran_siswa;

  // eksekusi
  modelDetailPS
    .destroy({ where: { id_pelanggaran_siswa: id } })
    .then(result => {
      let id = request.params.id_pelanggaran_siswa

      //hapus data pelanggaran siswa
      modelPS.destroy({
          where: {id_pelanggaran_siswa:id}
      })
      .then(result => {
          return response.json({
              message : `Data Has been deleted`
          })
      })
      .catch(error => {
          return response.json({
              message : error.message
          })
      })
    })
    .catch((error) => {
      return response.json({
        message: error.message,
      });
    });
};
