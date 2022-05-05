import user from "../model/user.js";

const findUsers = (req, res) => {
    const filter = {};
    const {id, name, role} = req.query;
        id && (filter.id = id); 
        name && (filter.name = name);
        role && (filter.role = role);

    user.find(filter, (error, users) => {
        error ? 
            res.status(500).json(error) :
            res.status(http.OK).json(users);
        })
}

const registerUser = (req, res) => {
    const newUser = user(req.body);
    newUser.save((error) => {
        error ? 
            res.status(400).json(error) :
            res.status(201).json(newUser);
    });
}

const updateUser = (req, res) => {
    const filter = { id: req.query.id || 'inavlidId' };
    const getUpdatedData = { new: true };

    user.findOneAndUpdate(filter, req.body, getUpdatedData, (error, updatedUser) => {
        !updatedUser ? 
            res.status(404).json('user not found') :
            error ? 
                res.status(400).json(error) :
                res.status(200).json(updatedUser);
    });       
}

const deleteUser = (req, res) => {
    const filter = { id: req.query.id || 'inavlidId' };

    user.findOneAndDelete(filter, (error, deletedUser) => {
        !deletedUser ? 
            res.status(404).json('user not found') :
            error ? 
                res.status(400).json(error) :
                res.status(200).json(deletedUser);
    });       
}

export { registerUser, updateUser, deleteUser, findUsers };