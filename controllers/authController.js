import { comparePassword } from '../utils/bcrypt.js';
import { generateJwtToken } from '../utils/jwt.js';

class AuthController {

    async login (req, res) {
        try {
            let name = req.body.name;
            let pw = req.body.password;



        } catch (e) {
            res.status(500).json({ status: 'unxpected error : ' + e});
            return;
        };
    };

};

export default new AuthController();