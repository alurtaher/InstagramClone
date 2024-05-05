//From this file we can perform CURD operations from any file in the Database

const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

//Connecting to the mongodb Database
mongoose.connect("mongodb://127.0.0.1:27017/instaClone")

//Tell how our document look alike
const userSchema = mongoose.Schema({
  userName:String,
  name:String,
  email:String,
  password:String,
  profileImage:String,
  posts:[{type:mongoose.Schema.Types.ObjectId ,ref:"post"}]
});

//From this line we are providing the serialize and the deserialize user
userSchema.plugin(plm)

//Exporting the collection/model 
module.exports = mongoose.model("user",userSchema)