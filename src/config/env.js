const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

module.exports = {
    PORT: process.env.SERVER_PORT || 3001,
};
