const express = require(`express`)
const app = express()

app.use(express.json())

// call user control
let userControl = require("../controllers/userControl")

//end point GET untuk menampilkan data user
app.get("/", userControl.getDataUser)

//end point POST untuk menambah data user
app.post("/", userControl.addDataUser)

//end point PUT untuk mengedit data user
app.put("/:id_user", userControl.editDataUser)

//end point DELETE untuk menghapus data user
app.delete("/:id_user", userControl.deleteDataUser)

app.post("/auth", userControl.authentication)

module.exports = app