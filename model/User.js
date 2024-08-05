const mongoose =  require( 'mongoose');

const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        unique: false,
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: [true, "Email Exist"]
    },
    firstName:{
        type: String,
        unique: false,
    },
    lastName: {
        type: String,
        unique: false,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const UserModel =  mongoose.model('User', UserSchema);

module.exports = UserModel;