const db = require("../../database");
const crypto = require("crypto")

const addNewUser = (user, done) => {
    const salt = crypto.randomBytes(64);
    const hash = getHash(user.password, salt);

    const sql = 'INSERT INTO users (first_name, last_name, email, password, salt) VALUES (?,?,?,?,?)'
    let values = [user.first_name, user.last_name, user.email, hash, salt.toString('hex')];

    db.run(sql, values, function(err){
        if(err) return done(err);

        return done(null, this.lastID);
    })
}

const getAllusers = (done) => {
    const results = [];

    db.each(
        'SELECT * FROM users', 
        [], 
        (err,row) => {
            if(err) console.log("something went wrong: " + err)
            results.push({
                user_id: row.user_id,
                first_name: row.first_name,
                last_name: row.last_name,
                email: row.email
            })
        }
        ,(err, num_rows) => {
            return done (err, num_rows, results)
        }
    )
}

const getIDFromToken = (token, done) => {
    const sql = 'SELECT user_id FROM users WHERE session_token=?'
    const params = [token]

    db.get(sql,
        [token],
        (err,row) => {
            if(err) return done (err)
            if(!row || row.user_id === null){
                return done(404)
            }
            return done(null, row.user_id)
        })
}

const authenticateUser = (email, password, done) => {
    const sql = 'SELECT user_id, password, salt FROM users WHERE email=?'

    db.get(sql, [email], (err, row) => {
        if(err) return done(err)
        if(!row) return done(404) //wrong email

        if(row.salt === null) row.salt = ''

        let salt = Buffer.from(row.salt, 'hex')

        if (row.password === getHash(password, salt)){
            return done (false, row.user_id)

        }else{
            return done(404) //wrong password
        }
    })
}
const setToken = (id, done) => {
    let token = crypto.randomBytes(16).toString('hex');

    const sql = 'UPDATE users SET session_token=? WHERE user_id=?'

    db.run(sql, [token, id], (err) => {
        return done(err, token)
    })
}

const getToken = (id, done) => {
    const sql = 'SELECT session_token FROM users WHERE user_id=?'

    db.get(sql, [id], (err,row) => {
            //console.log(row)
     
            if(err) return done(err)
            if(!row || row.session_token === null) return done(404)

            return done(null, row.session_token)
        })
}

const removeToken = (token, done) => {
    const sql = 'UPDATE users SET session_token=null WHERE session_token=?'

        db.run(sql, [token], (err) => {
            return done(err)
        })
}


const getHash = function(password, salt){
    return crypto.pbkdf2Sync(password, salt, 100000, 256, 'sha256').toString('hex');

}

module.exports = {
    getToken: getToken,
    setToken: setToken,
removeToken: removeToken,
    addNewUser: addNewUser,
   // getHash: getHash,
    authenticateUser: authenticateUser,
    getAllusers:getAllusers,
    getIDFromToken:getIDFromToken
}