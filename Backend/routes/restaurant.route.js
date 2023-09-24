
const {Router} = require('express');

const restaurantRouter = Router();

const {
    getRestaurant,
    getRestaurantById,
    addNewRestaurant,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurant');


restaurantRouter.get('/', getRestaurant);

restaurantRouter.get('/:id', getRestaurantById);

restaurantRouter.post('/', addNewRestaurant);

restaurantRouter.put('/:id', updateRestaurant);

restaurantRouter.patch('/:id', updateRestaurant);

restaurantRouter.delete('/:id', deleteRestaurant);


module.exports = restaurantRouter;