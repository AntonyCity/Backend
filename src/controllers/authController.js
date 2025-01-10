import authService from '../services/authService.js';

class AuthController {
    async login(req, res) {
        try {
            const { name, password } = req.body;

            const result = await authService.loginUser({ name, password });

            if (result.error) {
                res.status(result.status).json({ status: result.error });
                return;
            }

            res.status(200).json({ name: result.name, role: result.role, token: result.token });
        } catch (e) {
            res.status(500).json({ status: 'unexpected error: ' + e });
        }
    }
}

export default new AuthController();
