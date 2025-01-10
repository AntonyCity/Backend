import userService from '../services/userService.js';

class UserController {
    async create(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const { name, role } = req.body;

            const result = await userService.createUser({ token, name, role });

            if (result.error) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            res.status(200).json({ status: result.status });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async show(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            const result = await userService.getAllUsers(token);

            if (result.error) {
                res.status(result.status).json({ error: result.error });
                return;
            }

            res.status(200).json({ allUser: result.data });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async update(req, res) {
        try {
            // TODO
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }

    async delete(req, res) {
        try {
            // TODO
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }
}

export default new UserController();
