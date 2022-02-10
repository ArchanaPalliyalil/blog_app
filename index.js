const express = require('express');
const cors = require('cors');
const article = require('./src/model/ArticleModel');
const loginRouter = require('./src/routes/loginroute');
const signupRouter = require('./src/routes/signuproute');
const articleRouter = require('./src/routes/articleroute.js');
const path = require('path')

const app = express();
app.use(cors());
// Post Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./build/'));




app.use('/api/login',loginRouter); 
app.use('/api/signup',signupRouter); 
app.use('/api/article',articleRouter); 


app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname+'/build/index.html'));
});
// Basic Article Fetch Route
app.get('/api/article/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleName = req.params.name;
        article.findOne({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', eroor });
    }
});

// Upvotes Routing
app.post('/api/article/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const update = { $inc: { upvotes: 1 } };
    article.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    article.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})



app.listen(process.env.PORT || 5001,()=>{
    console.log("Server Ready on 5001"); 
});