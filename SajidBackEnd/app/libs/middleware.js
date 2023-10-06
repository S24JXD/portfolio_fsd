const userModel = require("../models/user.model");

const isAuthenticated = function(req, res, next){
let token = req.get("X-Authorization");

userModel.getIDFromToken(token, (err, id) => {
    if (err || id === null) {
        return res.sendStatus(401);
    }
    next();

});
};

module.exports = {
    isAuthenticated: isAuthenticated
}