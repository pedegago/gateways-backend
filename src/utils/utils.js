/**
 * Required modules.
 */
const _ = require("lodash");

/**
 * This function validates if a given string
 * is a valid Ipv4 address or not.
 */
const isIpv4 = (str) => {
    // Ipv4 regular expression.
    const addr = /^(\d{1,3}\.){3}\d{1,3}$/;

    if (!addr.test(str))
        return false;

    let isValid = true;

    // Ensure that all octets are between 0 and 255.
    _.each(str.split("."), (o) => {
        if (o < 0 || o > 255) {
            isValid = false

            return false;
        }
    });

    return isValid;
};

/**
 * Exporting functions.
 */
module.exports = {
    isIpv4
}
