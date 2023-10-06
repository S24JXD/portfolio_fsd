const users = require ('../controller/user.controller')
const auth = require("../libs/middleware")
module.exports = function(app){
    app.route("/users")
        .post(auth.isAuthenticated, users.Create)
        .get(auth.isAuthenticated,users.getallUsers);

    app.route("/login")
        .post(users.login);
    
    app.route("/logout")
        .post(auth.isAuthenticated, users.logout);

    
        
    
}