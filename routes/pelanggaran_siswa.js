const express = require(`express`)
const app = express()

// membaca request data berupa json
app.use(express.json())

// call pelanggaran control
let pelanggaranSiswaControl = require("../controllers/pelanggaranSiswaControl")

//end point GET untuk menampilkan data pelanggaran siswa
app.get("/", pelanggaranSiswaControl.getDataPelanggaranSiswa)

//end point POST untuk menambah data pelanggaran siswa
app.post("/", pelanggaranSiswaControl.addDataPelanggaranSiswa)

//end point PUT untuk mengedit data pelanggaran siswa
app.put("/:id_pelanggaran_siswa", pelanggaranSiswaControl.editDataPelanggaranSiswa)

//end point DELETE untuk menghapus data pelanggaran siswa
app.delete("/:id_pelanggaran_siswa", pelanggaranSiswaControl.deleteDataPelanggaranSiswa)

module.exports = app