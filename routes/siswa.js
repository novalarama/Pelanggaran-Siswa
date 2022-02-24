const express = require(`express`);
const app = express();

app.use(express.json());

// call siswa control
let siswaControl = require("../controllers/siswaControl");

// call test middleware
 let tesMiddleware = require("../middlewares/test")
let authorization = require("../middlewares/authorization");

//end point GET untuk menampilkan data siswa
app.get(
  "/",
  [
    tesMiddleware.middleware1,
    tesMiddleware.middleware2,
    authorization.authorization,
  ],
  siswaControl.getDataSiswa
);

//end point POST untuk menambah data siswa
app.post("/", siswaControl.addDataSiswa);

//end point PUT untuk mengedit data siswa
app.put("/:id_siswa", siswaControl.editDataSiswa);

//end point DELETE untuk menghapus data siswa
app.delete("/:id_siswa", siswaControl.deleteDataSiswa);

module.exports = app;
