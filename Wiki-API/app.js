import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", { useNewUrlParser: true });

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("articles", articleSchema);

app.get("/articles", (req, res) => {
  Article.find({}, (err, foundArticles) => {
    if (!err) res.send(foundArticles);
    else res.send(err);
  });
});

app.post("/articles", (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
  });
  newArticle.save(function (err) {
    if (!err) {
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
});

app.delete("/articles", (req, res) => {
  Article.deleteMany({}, function (err) {
    if (!err) res.send("Successfully deleted all articles");
    else res.send(err);
  });
});

app
  .route("/articles/:articleTitle")

    // http://localhost:3000/articles/DOM
  .get((req, res) => {
    const articleTitle = req.params.articleTitle;
    Article.findOne({ title: articleTitle }, function (err, article) {
      if (article) {
        const jsonArticle = JSON.stringify(article);
        res.send(jsonArticle);
      } else {
        res.send("No article with that title found.");
      }
    });
  })

  .patch(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.update(
      { title: articleTitle },
      { content: req.body.newContent },
      function (err) {
        if (!err) {
          res.send("Successfully updated selected article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .put(function (req, res) { 
    const articleTitle = req.params.articleTitle;

    Article.update(
      { title: articleTitle },
      { content: req.body.newContent },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated the content of the selected article.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function (req, res) {
    const articleTitle = req.params.articleTitle;
    Article.findOneAndDelete({ title: articleTitle }, function (err) {
      if (!err) {
        res.send("Successfully deleted selected article.");
      } else {
        res.send(err);
      }
    });
  });

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
