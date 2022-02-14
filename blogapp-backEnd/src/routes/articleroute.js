const express = require("express");
const articleRouter = express.Router();
const article_data = require("../model/ArticleModel");

articleRouter.get('/',function(req,res){

  article_data.find() 
  .then(function (articles) {
    res.status(200).json(articles);


  })
})

articleRouter.post("/add", function (req, res) {
  var new_article = {
    name: req.body.short_name,
    upvotes: 0,
    comments: [],
    username: "",
    description: req.body.description,
    title:req.body.title
  };
  const article = new article_data(new_article);
  article.save();
  console.log(
    " A new article has been added to the database successfully : " + article
  );
  res.status(201).json(article);
});

articleRouter.put(":name/update", function (req, res) {

  article_data.findByIdAndUpdate(req.params.name, { $set: req.body }, function (err, data) {
    if (err) {
        res.json({ status: "Failed" });
    }
    else if (data.n == 0) {
        res.json({ status: "No match Found" });
    }
    else {
      console.log(
        " A new article has been updated to the database successfully : " + article
      );
      res.status(200).json(article);
    }
})
});

articleRouter.delete("/delete", function (req, res) {
  const name = req.body.name;  
  console.log("Request recieved for deleting " +name);

  article_data.findOneAndDelete({ name: name })
  .then(function () {

    console.log(
      " A new article has been deleted from the database" 
    );
    res.status(200).json("{\"status\":\"article has been deleted.\"");

  })  

});


module.exports = articleRouter;
