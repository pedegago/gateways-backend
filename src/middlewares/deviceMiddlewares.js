const _ = require("lodash");

const validateDevice = (req, res, next) => {
    const { vendor } = req.body;
    const fields = {};

    let isValid = true;

    if (_.isEmpty(vendor)) {
        fields.vendor = "Device vendor is required.";
        isValid = false;
    }

    if (!isValid) {
        res.status(400).json({
            message: "#400: Device validation error.",
            fields
        });

        return;
    }

    next();
};

const getDeviceByParam = (req, res, next) => {
    const device = _.find(
        req.gateway.devices,
        (d) => d.id == req.params.id
    );

    if (!device) {
        res.status(404).json({
            message: "#404: Device not found."
        });

        return;
    }

    req.device = device;
    next();
};

const deviceLimit = (req, res, next) => {
    if (req.gateway.devices.length >= 10) {
        res.status(400).json({
            message: "#400: Device limit exceeded."
        });

        return;
    }

    next();
}

module.exports = {
    validateDevice,
    getDeviceByParam,
    deviceLimit
};
