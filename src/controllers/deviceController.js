/**
 * Required modules.
 */
const _ = require("lodash");

/**
 * In-memory database.
 * This JSON contains the initial information
 * about gateways and devices.
 */
let gateways = require("../data/database");

/**
 * Returns all devices from specified gateway.
 * This function obtains the gateway information
 * via middlewares.
 */
const getDevices = (req, res) => {
    res.json(req.gateway.devices);
};

/**
 * Insert new device into specified gateway.
 * This function obtains the gateway information
 * via middlewares.
 */
const addDevice = (req, res) => {
    const { vendor, isOnline } = req.body;

    // Found a new and available id value.
    let id = _.get(
        _.maxBy(req.gateway.devices, "id"),
        "id",
        0
    );
    id++;

    // Creates the device object.
    const device = {
        id,
        vendor,
        isOnline: !!isOnline,
        dateCreated: new Date()
    };

    // Found and update the device information.
    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            g.devices.push(device);

            return false;
        }
    });

    // Returns the new resource.
    res.status(201).json(device);
};

/**
 * Deletes device from specified gateway.
 * This function obtains the gateway and device
 * information via middlewares.
 */
const deleteDevice = (req, res) => {
    // Found and remove the device.
    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            _.remove(g.devices, (d) => d.id == req.device.id);

            return false;
        }
    });

    // Returns no content.
    res.status(204).end();
};

/**
 * Exporting functions.
 */
module.exports = {
    getDevices,
    addDevice,
    deleteDevice
};
