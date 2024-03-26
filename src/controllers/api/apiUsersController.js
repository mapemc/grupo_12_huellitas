const path = require("path");
const db = require('../../database/models');

const User = db.User;

const apiUsersController = {
    async getUsers(req, res) {
        try {
            const users = await User.findAll();
            const userList = users.map(user => {
                return{
                    detail: `/api/users/${user.id}`,
                    username: user.username, 
                    name: user.name,
                    email: user.email,
                };
            });
            res.json({
                count: userList.length,
                users: userList
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    async getUserByUsername(req, res) {
        try {
            const username = req.params.username;
            const user = await User.findOne({ where: { username: username } });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            const userDetail = {
                detail: `/api/users/${user.id}`,
                username: user.username,
                name: user.name,
                email: user.email,
                birthday: user.birthday,
                avatar: user.avatar ? `../public/img/avatars/${user.avatar}` : null
            };
            res.json(userDetail);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = apiUsersController;
