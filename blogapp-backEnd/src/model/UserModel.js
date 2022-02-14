const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://userone:userone@fsdfiles.ltrsv.mongodb.net/my_blog?retryWrites=true&w=majority");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

const userdata = mongoose.model("userdata", UserSchema);

module.exports = userdata;
