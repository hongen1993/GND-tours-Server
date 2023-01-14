module.exports = (app) => {
    app.use("/home", require("./index.routes"))
    app.use("/auth", require("./auth.routes"))
}