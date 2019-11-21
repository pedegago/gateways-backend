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
 * Returns all gateways and their devices.
 */
const getAllGateways = (req, res) => {
    res.json(gateways);
};

/**
 * Insert new gateway into database.
 */
const addGateway = (req, res) => {
    const { serial, name, ipv4 } = req.body;

    // Inserts new gateway with an empty list of devices.
    gateways.push({
        serial,
        name,
        ipv4,
        devices: []
    });

    // Returns the new resource uri.
    res.status(201).json({
        uri: `/api/gateways/${serial}`
    });
};

/**
 * Returns specified gateway with no devices.
 * Devices are availables vía:
 * GET /api/gateways/{serial}/devices.
 * This function obtains the gateway information
 * via middlewares.
 */
const getGateway = (req, res) => {
    res.json(
        _.omit(req.gateway, "devices")
    );
};

/**
 * Updates specified gateway.
 * This function obtains the gateway information
 * via middlewares.
 */
const updateGateway = (req, res) => {
    const { serial, name, ipv4 } = req.body;

    // Found and update the gateway information.
    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            g.serial = serial;
            g.name = name;
            g.ipv4 = ipv4;

            return false;
        }
    });

    // Returns the resource uri.
    res.json({
        uri: `/api/gateways/${serial || req.gateway.serial}`
    });
};

/**
 * Deletes gateway.
 * This function obtains the gateway and device
 * information via middlewares.
 */
const deleteGateway = (req, res) => {
    // Remove the gateway from database.
    _.remove(gateways, (g) => g.serial == req.gateway.serial);

    // Returns no content.
    res.status(204).end();
};

/**
 * Exporting functions.
 */
module.exports = {
    getAllGateways,
    addGateway,
    getGateway,
    updateGateway,
    deleteGateway
};
