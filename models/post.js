var mongoose = require("mongoose");

var PostSchema = new mongoose.Schema({
    topic: String,
    type : String, //canteen,worksp
    location: String, //lek,yai
    faculty : String,
    image: String,
    description : String, //comment
    date : Date,
    user : String,
});
module.exports = {Post: mongoose.model('post', PostSchema) }
