const bcrypt = require(`bcrypt`)
const jwt = require(`jsonwebtoken`)
const db = require("../db")
const { response } = require("../routes/siswa")


const secret = `#$@^%$^%*&%$$@&`

function hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports = {
    registrasi : (request, response) => {
        const {nama_user,username,password} = request.body
        if(!nama_user, !username || !password) response.status(402).json({message : `nama_user, username dan password must be filled`})

        return db.query('insert into pengguna set ?', {nama_user, username, password: hashPassword(password)}, (error, result)=>{
            if(error)return response.status(500).json({error})

            return response.json({message: `registrasi successfull`, data:result})

        })
    },
    login : (request, response) => {
        const{username, password}= request.body
        if(!nama_user, !username || !password) response.status(402).json({message : `nama_user, username dan password must be filled`})

        return db.query('select * from pengguna WHERE username = ?', username, (error, result)=>{
            if(error)return response.status(500).json({error})

            const user = result[0]
            if(typeof user === `undefined`) return response.status(401).json({message:`user tidak ditemukan`})
            if(!bcrypt.compareSync(password, user.password)) return response.status(401).json({message: `username atau password tidak sesuai`})

            const token = jwt.sign({data:user}, secret)
            return response.json({message:`login successfull, please use the token on below for access the other private endpoint`, token})
        })
    }
}
