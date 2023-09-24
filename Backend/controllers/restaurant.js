
const { Op } = require('sequelize');

const { Restaurant, User } = require('../models/index');


const getFilterObject = (search, limit, page) => {
    let filterObject = {};

    let filterBySearch = {};
    if (search) {
        filterBySearch = {
            [Op.or]: [
                { name: { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } },
                { contact: { [Op.like]: `%${search}%` } }
            ],
        };
    }

    filterObject.where = filterBySearch;

    if (page && limit) {
        const offset = (page - 1) * limit;
        filterObject.offset = offset;
        filterObject.limit = parseInt(limit);
    } else if (limit) {
        filterObject.limit = parseInt(limit);
    }

    return filterObject
}

const getRestaurant = async (req, res) => {
    const { search, limit, page } = req.query;

    try {

        const filterObject = getFilterObject(search, limit, page);

        const totalCount = await Restaurant.count({ where: filterObject.where });

        res.append('X-Total-Count', totalCount);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        User.hasMany(Restaurant, { foreignKey: "added_by" });
        Restaurant.belongsTo(User, { foreignKey: "added_by" });

        const restaurants = await Restaurant.findAll({ ...filterObject, include: [User] });

        res.status(200).json(restaurants);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found.' });
        } else {
            res.status(200).json(restaurant);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const addNewRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const [isUpdated] = await Restaurant.update(req.body, {
            where: { id },
        });
        if (isUpdated) {
            res.status(200).json({ message: 'Restaurant has been updated successfully.' });
        } else {
            res.status(404).json({ error: 'Restaurant not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Restaurant.destroy({
            where: { id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Restaurant has been deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Restaurant not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getRestaurant,
    getRestaurantById,
    addNewRestaurant,
    updateRestaurant,
    deleteRestaurant
}