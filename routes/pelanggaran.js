const express = require(`express`)
const app = express()

app.use(express.json())

// call pelanggaran control
let pelanggaranControl = require("../controllers/pelanggaranControl")

let authorization = require("../middlewares/authorization");

//end point GET untuk menampilkan data pelanggaran
app.get("/", [authorization.authorization], pelanggaranControl.getDataPelanggaran)

app.post("/find", [authorization.authorization], pelanggaranControl.findPelanggaran)

//end point POST untuk menambah data pelanggaran
app.post("/", [authorization.authorization],pelanggaranControl.addDataPelanggaran)

//end point PUT untuk mengedit data pelanggaran
app.put("/:id_pelanggaran", [authorization.authorization],pelanggaranControl.editDataPelanggaran)

//end point DELETE untuk menghapus data pelanggaran
app.delete("/:id_pelanggaran", [authorization.authorization], pelanggaranControl.deleteDataPelanggaran)

module.exports = app