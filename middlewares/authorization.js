exports.authorization = (request, response, next) => {
    // token dikirim melalui header
    let header = request.headers.authorization

    if (header === null) {
        return response.json({
            messsage : `Unauthorize!`
        })
    }

    // check jika header ada
    let token = header && header.split(" ")[1]
    
    if (!token) {
        return response.json({
            messsage : `Invalid Token`
        })
    }else{
        next()
    }
}