const crypto = require('crypto');

module.exports = {
    createHash(input, salt){
        const hash = crypto.createHash('sha256');
        hash.update(salt + input);
        return hash.digest('hex');
    },
    createSalt(){
        return crypto.randomBytes(256).toString("hex");
    }
};
