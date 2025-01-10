import userService from '../services/userService.js';

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createUser = async (req, res) => {
    const { name, password, token, role } = req.body;
    try {
        const user = await userService.createUser(name, password, token, role);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export default { getUsers, createUser };
