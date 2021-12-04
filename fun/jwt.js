const jwt = require("jsonwebtoken");
const Token = {
    generateToken(id) {
        return jwt.sign('id', 'lfy');
    },
    verifyToken(token) {
        try {
            return jwt.verify(token, 'lfy')
        } catch (error) {
            return null;
        }
    }
}
module.exports = Token;