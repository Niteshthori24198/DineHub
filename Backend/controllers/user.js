
const { Op } = require('sequelize');

const { Restaurant, User } = require('../models/index');

const getUser = async (req, res) => {
    const { search, limit, page } = req.query;

    try {
        let filterObject = {};

        let filterBySearch = {};
        if (search) {
            filterBySearch = {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
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

        const totalCount = await User.count({ where: filterObject.where });

        res.append('X-Total-Count', totalCount);
        res.append('Access-Control-Expose-Headers', 'X-Total-Count');

        User.hasMany(Restaurant, { foreignKey: "added_by" });
        Restaurant.belongsTo(User, { foreignKey: "added_by" });


        const usersData = await User.findAll({ ...filterObject, include: [Restaurant] });

        res.status(200).json(usersData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const userInfo = await User.findByPk(id);
        if (!userInfo) {
            res.status(404).json({ error: 'User not found.' });
        } else {
            res.status(200).json(userInfo);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const addNewUser = async (req, res) => {
    try {
        const userInfo = await User.create(req.body);
        res.status(201).json(userInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const [isUpdated] = await User.update(req.body, {
            where: { id },
        });
        if (isUpdated) {
            res.status(200).json({ message: 'User has been updated successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await User.destroy({
            where: { id },
        });
        if (deleted) {
            res.status(200).json({ message: 'User has been deleted successfully.' });
        } else {
            res.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getUser,
    getUserById,
    addNewUser,
    updateUser,
    deleteUser
}