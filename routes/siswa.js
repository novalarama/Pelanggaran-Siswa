const express = require(`express`)
const app = express()

app.use(express.json())

// call siswa control
let siswaControl = require("../controllers/siswaControl")

//end point GET untuk menampilkan data siswa
app.get("/", siswaControl.getDataSiswa)

//end point POST untuk menambah data siswa
app.post("/", siswaControl.addDataSiswa)

//end point PUT untuk mengedit data siswa
app.put("/:id_siswa", siswaControl.editDataSiswa)

//end point DELETE untuk menghapus data siswa
app.delete("/:id_siswa", siswaControl.deleteDataSiswa)

module.exports = app