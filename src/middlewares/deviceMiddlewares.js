/**
 * Required modules.
 */
const _ = require("lodash");

/**
 * Validates device information.
 * This middleware obtains the device information
 * via request.
 */
const validateDevice = (req, res, next) => {
    const { vendor } = req.body;
    const fields = {};

    let isValid = true;

    // Validates vendor attribute.
    if (_.isEmpty(vendor)) {
        fields.vendor = "Device vendor is required.";
        isValid = false;
    }

    if (!isValid) {
        // Returns an error if device information is not valid.
        // The response contains the message and invalid fields.
        res.status(400).json({
            message: "#400: Device validation error.",
            fields
        });

        return;
    }

    next();
};

/**
 * Found specified device.
 * This middleware obtains the gateway and device
 * information via request.
 */
const getDeviceByParam = (req, res, next) => {
    // Tries to found device.
    const device = _.find(
        req.gateway.devices,
        (d) => d.id == req.params.id
    );

    if (!device) {
        // Returns an error if device was not found.
        res.status(404).json({
            message: "#404: Device not found."
        });

        return;
    }

    // Assigns device information into request object.
    req.device = device;
    next();
};

/**
 * This middleware determines if gateway has enough
 * space for storing a new device.
 * The device limit is 10.
 */
const deviceLimit = (req, res, next) => {
    if (req.gateway.devices.length >= 10) {
        // Returns an error when the limit is exceeded.
        res.status(400).json({
            message: "#400: Device limit exceeded."
        });

        return;
    }

    next();
}

/**
 * Exporting middlewares.
 */
module.exports = {
    validateDevice,
    getDeviceByParam,
    deviceLimit
};
