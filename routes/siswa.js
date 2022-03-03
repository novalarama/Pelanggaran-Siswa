const express = require(`express`);
const app = express();

app.use(express.json());

// call siswa control
let siswaControl = require("../controllers/siswaControl");

// call test middleware
let tesMiddleware = require("../middlewares/test");
let authorization = require("../middlewares/authorization");
let uploadImage = require("../middlewares/uploadImage");

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
app.post(
  "/",
  [uploadImage.upload.single(`image`), authorization.authorization],
  siswaControl.addDataSiswa
);

//end point PUT untuk mengedit data siswa
app.put(
  "/:id_siswa",
  [authorization.authorization],
  siswaControl.editDataSiswa
);

//end point DELETE untuk menghapus data siswa
app.delete(
  "/:id_siswa",
  [authorization.authorization],
  siswaControl.deleteDataSiswa
);

module.exports = app;
