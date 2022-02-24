exports.middleware1 = (request, response, next) => {
    let message = `this is first middleware`
    console.log(message);
    next()
}
exports.middleware2 = (request, response, next) => {
    let message = `This is novalarama`
    console.log(message);
    next()
}