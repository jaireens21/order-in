const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const UserSchema=new mongoose.Schema({
    email:String,
});
UserSchema.plugin(passportLocalMongoose);
//Passport-Local Mongoose will add a username, hash and salt field; to store the username, the hashed password and the salt value respectively.
module.exports=mongoose.model('User', UserSchema);