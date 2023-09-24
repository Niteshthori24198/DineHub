
const {Router} = require('express');

const userRouter = Router();

const {
    getUser,
   getUserById,
   addNewUser,
   updateUser,
   deleteUser
} = require('../controllers/user');


userRouter.get('/', getUser);

userRouter.get('/:id', getUserById);

userRouter.post('/', addNewUser);

userRouter.put('/:id', updateUser);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);


module.exports = userRouter;