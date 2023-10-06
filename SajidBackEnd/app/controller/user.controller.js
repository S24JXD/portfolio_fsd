const joi = require("joi")
const user = require("../models/user.model");
const auth = require("../libs/middleware")
const db = require("../../database")

const login = (req,res) => {
    const schema = joi.object({
        "email":joi.string().required(),
        "password":joi.string().required()

    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

 user.authenticateUser(req.body.email, req.body.password, (err, id) => {
    if(err === 404) return res.status(400).send("invalid email/password supplied")
    if (err) return res.sendStatus(500)

    user.getToken(id, (err, token) => {
        if(err && err != 404) {
            console.log(1, err);
            return res.sendStatus(500)
        }
   
        if(token){
            return res.status(200).send({user_id: id, session_token: token})
        }else{
            user.setToken(id, (err, token) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                return res.status(200).send({user_id: id, session_token: token})
            })
        }
    })
 })

}

const getallUsers = (req,res) => {
    user.getAllusers((err,num_rows,results) => {
        if(err) return res.sendstatus(500);
    
        return res.status(200).send(results);
    })
}

const Create = (req,res) => {

    const schema = joi.object({
        "first_name": joi.string().required(),
        "last_name": joi.string().required(),
        "email":joi.string().email().required(),
        "password":joi.string().required()

    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let temp_user =Object.assign({}, req.body);

    user.addNewUser(temp_user, (err, user_id) => {
        if(err){
            console.log(err)
            return res.sendStatus(500);
        } 

        return res.status(201).send({user_id: user_id})
    })
}

const logout = (req,res) => {
    let token = req.get("X-Authorization");

    
    user.removeToken(token, (err) => {
        if(err === 401) return res.sendStatus(401)
        if(err) return res.sendStatus(500)
        console.log(token)
        return res.status(200).send("logged out " )
    })
}

module.exports = {
    Create: Create,
    login: login,
    logout:logout,
    getallUsers:getallUsers

}

/*const logout = (req,res) => {
    let user_id = parseInt(req.params.user_id);

    user.removeToken(user_id, (err) => {
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        row.session_token === null
            return res.sendStatus(200)
    
    })
}*/
