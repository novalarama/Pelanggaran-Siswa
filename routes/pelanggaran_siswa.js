const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggaran control
let pelanggaranSiswaControl = require("../controllers/pelanggaranSiswaControl")

//end point GET untuk menampilkan data pelanggaran siswa
app.get("/", pelanggaranSiswaControl.getDataPelanggaranSiswa)

//end point POST untuk menambah data pelanggaran siswa
app.post("/", pelanggaranSiswaControl.addDataPelanggetDataPelanggaranSiswa)

//end point PUT untuk mengedit data pelanggaran siswa
app.put("/:id_pelanggaran", pelanggaranSiswaControl.editDataPelanggetDataPelanggaranSiswa)

//end point DELETE untuk menghapus data pelanggaran siswa
app.delete("/:id_pelanggaran", pelanggaranSiswaControl.deleteDataPelanggetDataPelanggaranSiswa)

module.exports = app