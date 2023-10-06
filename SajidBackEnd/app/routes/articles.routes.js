const articles = require ('../controller/articles.controller')
const auth = require("../libs/middleware")
module.exports = function(app){
    app.route('/articles')
        .get(articles.getAll)
        .post(auth.isAuthenticated, articles.Create);

    app.route('/articles/:article_id')
        .get(articles.getOne)
        .patch(auth.isAuthenticated, articles.updateArticles)
        .delete(auth.isAuthenticated, articles.deleteArticle);

        app.route('/articles/:article_id/comments')
        .post(articles.CreateComment)
        .get(articles.getAllComments)
        //.delete(articles.deleteComment);

        app.route('/articles/:comment_id')
        .delete(auth.isAuthenticated, articles.deleteComment);
//188 and 33
}