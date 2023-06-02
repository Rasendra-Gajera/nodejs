const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    username: String,
    password: String,
    email:String,

});


module.exports = mongoose.model("App", AppSchema);