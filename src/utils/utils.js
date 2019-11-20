const _ = require("lodash");

const isIpv4 = (str) => {
    const addr = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!addr.test(str))
        return false;

    let isValid = true;

    _.each(str.split("."), (o) => {
        if (o < 0 || o > 255) {
            isValid = false

            return false;
        }
    });

    return isValid;
};

module.exports = {
    isIpv4
}
