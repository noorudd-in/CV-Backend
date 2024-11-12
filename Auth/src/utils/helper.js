const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}

const cleanEmail = (email) => {
    const [local, domain] = email.split('@');
    const normalizedLocal = local.replace(/\./g, '');
    return `${normalizedLocal}@${domain}`;
}

const restrictedUsernames = ["admin", "user", "root", "support", 'vmc', 'viewmycv', 'showmycv', 'viewcv', 'showcv'];

module.exports = {
    hashPassword, cleanEmail, restrictedUsernames
}