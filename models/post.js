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
<<<<<<< HEAD
module.exports = mongoose.model("Post", PostSchema);
=======
module.exports = mongoose.model("Post", PostSchema);
>>>>>>> b7e52454a6a09f92484618d2b0b94309d62eb4d6
