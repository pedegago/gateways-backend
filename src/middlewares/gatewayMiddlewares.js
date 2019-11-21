/**
 * Required modules.
 */
const _ = require("lodash");
const { isIpv4 } = require("../utils/utils");

/**
 * In-memory database.
 * This JSON contains the initial information
 * about gateways and devices.
 */
const gateways = require("../data/database");

/**
 * Validates gateway information.
 * This middleware obtains the gateway information
 * via request.
 */
const validateGateway = (req, res, next) => {
    const { serial, name, ipv4 } = req.body;
    const fields = {};

    let isValid = true;

    // Validates vendor attribute.
    if (_.isEmpty(serial)) {
        fields.serial = "Gateway serial is required.";
        isValid = false;
    } else {
        // Tries to found gateway with the same serial.
        const exist = _.find(gateways, (g) =>
            g.serial == serial
        );

        if (exist) {
            const method = req.method;

            // Validates if there is another gateway with the same serial.
            if (method == "POST" || (method == "PUT" && serial != req.params.serial)) {
                fields.serial = "Gateway serial already exist.";
                isValid = false;
            }
        }
    }

    // Validates name attribute
    if (_.isEmpty(name)) {
        fields.name = "Gateway name is required.";
        isValid = false;
    }

    // Validates ipv4 attribute format.
    if (!isIpv4(ipv4)) {
        fields.ipv4 = "Invalid IPv4 format.";
        isValid = false;
    }

    if (!isValid) {
        // Returns an error if gateway information is not valid.
        // The response contains the message and invalid fields.
        res.status(400).json({
            message: "#400: Gateway validation error.",
            fields
        });

        return;
    }

    next();
};

/**
 * Found specified gateway.
 * This middleware obtains the gateway information
 * via request.
 */
const getGatewayByParam = (req, res, next) => {
    // Tries to found gateway.
    const gateway = _.find(
        gateways,
        (g) => g.serial == req.params.serial
    );

    if (!gateway) {
        // Returns an error if gateway was not found.
        res.status(404).json({
            message: "#404: Gateway not found."
        });

        return;
    }

    // Assigns gateway information into request object.
    req.gateway = gateway;
    next();
};

/**
 * Exporting middlewares.
 */
module.exports = {
    validateGateway,
    getGatewayByParam
};
