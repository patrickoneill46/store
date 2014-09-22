module.exports = function(User){

    function getUsers(req, res) {

        User.find({}, function(err, users){

            if(err){
                res.send(err);
            } else {
                res.send(users);
            }

        });

    }

    function deleteUser(req, res){

    }

    function update(req, res){

        if(req.params.userId){

            User.findByIdAndUpdate(req.params.userId, {$set: {role: req.body.role}}, function(err, updatedUser){

                if(err){
                    console.error('error', err);
                    res.status(500).json({message: 'Did not update'});
                } else{
                    res.status(200).json({message: 'Successfully updated!'});
                }

            });

        }

    }

    return {
        update: update,
        get: getUsers,
        delete: deleteUser
    };

}
