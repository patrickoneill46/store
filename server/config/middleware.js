var path = require('path');

function ensureAuthenticated(req, res, next) {

    if(req.user){
        next();
    }
    else {
        res.redirect(302, '/signin');
    }
}

function ensureAdmin(req,res, next){

    if(req.user && req.user.role === 'admin'){
        next();
    } else {
        res.status(401).json({message: 'Action not allowed for this user'});
    }
}

module.exports = {
    ensureAuthenticated: ensureAuthenticated,
    ensureAdmin: ensureAdmin
};