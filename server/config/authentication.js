var GoogleStrategy = require('passport-google').Strategy,
    userEmail;

function validUserEmail(user, validDomains){

    validDomains = validDomains || ['@thomascookonline'];

    return user.emails.some(function(email){

        var emailValid = false;

        validDomains.forEach(function(domain, index){

            if(email.value.toLowerCase().indexOf(domain) > 0) {
                emailValid = true;
                userEmail = email.value.toLowerCase();
            }
        });

        return emailValid;
    });
}

module.exports = function(passport, UserModel){

    passport.use(new GoogleStrategy({
            returnURL: 'http://localhost:9000/auth/google/return',
            realm: 'http://localhost:9000/'
        },
        function(identifier, profile, done) {

            //ToDo find user using their email
            UserModel.findOne({ googleId: identifier }, function(err, user) {

                if(err) {
                    done(err);
                }
                else {
                    if (!user && validUserEmail(profile)){

                        var newUser = new UserModel({
                            googleId: identifier,
                            email: userEmail,
                            firstName: profile.name.familyName,
                            lastName: profile.name.givenName
                        });

                        newUser.save(function(err,data){
                            done(err,data);
                        });

                    } else {

                        done(err, user);
                    }
                }
            });
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.googleId);
    });

    passport.deserializeUser(function(id, done) {
        UserModel.findOne({googleId: id}, function(err, user) {
            done(err, user);
        });
    });

}

