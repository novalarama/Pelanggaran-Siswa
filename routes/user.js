const express = require(`express`)
const app = express()

app.use(express.json())

// call user control
let userControl = require("../controllers/userControl")
const authorization = require("../middlewares/authorization")
const userValidator = require("../middlewares/userValidator")

//end point GET untuk menampilkan data user
app.get("/",[authorization.authorization], userControl.getDataUser)

app.post("/find", [authorization.authorization], userControl.findUser)

//end point POST untuk menambah data user
app.post("/", [userValidator.validate, authorization.authorization],userControl.addDataUser)

//end point PUT untuk mengedit data user
app.put("/:id_user", [authorization.authorization], userControl.editDataUser)

//end point DELETE untuk menghapus data user
app.delete("/:id_user", [authorization.authorization], userControl.deleteDataUser)

app.post("/auth", userControl.authentication)

module.exports = app