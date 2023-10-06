const res = require("express/lib/response");
const db = require("../../database");


const addNewArticle = (article, done) => {

    let date = Date.now();
    const sql = 'INSERT INTO articles (title, author, date_published, date_edited, article_text, created_by) VALUES (?,?,?,?,?,?)'
    let values = [article.title, article.author, date, date, article.article_text, 1];

    db.run(
        sql,
        values,
        function(err){
            if(err) return done(err,null);

            return done(null,this.lastID);
        }
    )
}

const addNewComment = (comment_text, article_id, done) => {

    const sql = 'INSERT INTO comments (comment_text, date_published, article_id) VALUES (?, ?, ?)'
    let values = [comment_text, new Date(), article_id];

    db.run(
        sql,
        values,
        function(err){
            if(err) return done(err,null);

            return done(null,this.lastID);
        }
    )
}

const getAllCommentsModel = (article_id, done) => {
    const results = [];

    db.each(
        "SELECT * FROM comments WHERE article_id=?",
        [article_id],
        (err,row) => {
            if(err) console.log("something went wrong: "+ err);

            results.push({
                comment_id:row.comment_id,
                comment_text: row.comment_text,
                date_published: new Date(row.date_published).toLocaleDateString(),

                
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}

const deleteComments = (id, done) => {
    const sql = 'DELETE FROM comments WHERE comment_id=?'

    db.run(sql, [id], function(err) {
        if(err) return res.sendStatus(500).send("something went wrong")

        return done(null)
    })
}


const getAllArticles = (done) => {
    const results = [];

    db.each(
        "SELECT * FROM articles",
        [],
        (err,row) => {
            if(err) console.log("something went wrong: "+ err);

            results.push({
                article_id: row.article_id,
                title: row.title,
                author: row.author,
                date_published: new Date(row.date_published).toLocaleDateString(),
                date_edited: new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text
            });
        },
        (err, num_rows) => {
            return done(err, num_rows, results);
        }
    )
}
const getSingleArticle = (id, done) => {
    const sql = 'SELECT * FROM articles WHERE article_id=?'

    db.get(sql, [id], (err,row) => {
     
            if(err) return done(err)
            if(!row) return done(404)

            return done(null, {
                article_id: row.article_id,
                title: row.title,
                author: row.author,
                date_published: new Date(row.date_published).toLocaleDateString(),
                date_edited: new Date(row.date_edited).toLocaleDateString(),
                article_text: row.article_text
            })
        })
}

const updateArticle = (id, article, done) => {
    const sql = 'UPDATE articles SET title=?, author=?, article_text=? WHERE article_id=?'
    let values = [article.title, article.author, article.article_text, id];

    db.run(sql,values,(err) => {
        return done(err)
    })
}

const deleteArticle = (id, done) => {
    const sql = 'DELETE FROM Articles WHERE article_id=?'

    db.run(sql, [id], function(err) {
        if(err) return res.sendStatus(500).send("something went wrong")

        return done(null)
    })
}

module.exports = {
    getAllArticles:getAllArticles,
    addNewArticle: addNewArticle,
    getSingleArticle: getSingleArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle,
    addNewComment:addNewComment,
    getAllCommentsModel:getAllCommentsModel,
    deleteComments:deleteComments
}