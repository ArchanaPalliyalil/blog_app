const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.ltrsv.mongodb.net/my_blog?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articles = new Schema({
    name: String,
    username: String,
    upvotes: Number,
    comments: Array,
    description: String,
    title:String
});

var articles = mongoose.model('articles', articles);

module.exports = articles;