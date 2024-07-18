module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'YOU MUST BE SIGNED IN')
        return res.redirect('/login')
    }
    next();
}

