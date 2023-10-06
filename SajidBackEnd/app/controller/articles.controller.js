const joi = require("joi")
const articles = require("../models/articles.models");


const Create = (req,res) => {

    const schema = joi.object({
        "title": joi.string().required(),
        "author": joi.string().required(),
        "article_text":joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let article =Object.assign({}, req.body);

    articles.addNewArticle(article, (err, id) => {
        if(err) return res.sendStatus(500);

        return res.status(201).send({article_id: id})
    })
}

const CreateComment = (req,res) => {
    let article_id = parseInt(req.params.article_id);
;
    const schema = joi.object({
        "comment_text": joi.string().required()
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    articles.addNewComment(req.body.comment_text, article_id, (err, id) => {
        if(err)  {
            console.log(err)
            return res.sendStatus(500)
        };

        return res.status(201).send({Comment_id: id})
    })
}

const getAllComments = (req,res) => {
    let article_id = parseInt(req.params.article_id);

    articles.getAllCommentsModel(article_id, (err,num_rows,results) => {
        if(err) return res.sendstatus(500);
    
        return res.status(200).send(results);
    })
}

const deleteComment = (req,res) => {
    let comment_id = parseInt(req.params.comment_id);

    articles.deleteComments(comment_id, (err) => {
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
            return res.sendStatus(200)
    
    })
}











const getAll = (req,res) => {
    articles.getAllArticles((err,num_rows,results) => {
        if(err) return res.sendstatus(500);
    
        return res.status(200).send(results);
    })
}

const getOne = (req,res) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err,result) => {
        if (err === 404) return res.sendStatus(404)
        if(err) return res.sendStatus(500)

        return res.status(200).send(result)
    })
}




const updateArticles = (req,res) => {
    let article_id = parseInt(req.params.article_id);

    articles.getSingleArticle(article_id, (err, result) => {
        if  (err === 404){ 
            console.log(err)
            return res.sendStatus(404)}
        if(err) return res.sendStatus(500)

        const schema = joi.object({
            "title": joi.string(),
            "author": joi.string(),
            "article_text":joi.string()
        })

        const{error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        if(req.body.hasOwnProperty("title")){
            result.title = req.body.title
        }

        if(req.body.hasOwnProperty("author")){
            result.author = req.body.author
        }

        if(req.body.hasOwnProperty("article_text")){
            result.article_text = req.body.article_text
        }

        articles.updateArticle(article_id, result, (err, id) => {
            if(err) {
                console.log(err)
                return res.sendStatus(500)
            }

            return res.sendStatus(200)
        })
        //rest
    
})}

const deleteArticle = (req,res) => {
    let article_id = parseInt(req.params.article_id);

    articles.deleteArticle(article_id, (err) => {
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
            return res.sendStatus(200)
    
    })
    

}

module.exports = {
    getAll: getAll,
    Create: Create,
    getOne: getOne,
    updateArticles: updateArticles,
    deleteArticle:deleteArticle,
    CreateComment:CreateComment,
    getAllComments:getAllComments,
    deleteComment:deleteComment
}

