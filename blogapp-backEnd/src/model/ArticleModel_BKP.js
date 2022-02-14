const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.ltrsv.mongodb.net/my_blog?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
    username: String,
    description: String
});

var ArticleInfo = mongoose.model('articles', articleSchema);

module.exports = ArticleInfo;