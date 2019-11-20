const _ = require("lodash");

let gateways = require("../data/database");

const getDevices = (req, res) => {
    res.json(req.gateway.devices);
};

const addDevice = (req, res) => {
    const { vendor, isOnline } = req.body;

    let id = _.get(
        _.maxBy(req.gateway.devices, "id"),
        "id",
        0
    );
    id++;

    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            g.devices.push({
                id,
                vendor,
                isOnline: !!isOnline,
                dateCreated: new Date(),
            });

            return false;
        }
    });

    res.status(201).json({
        uri: `/api/gateways/${req.gateway.serial}/devices/${id}`
    });
};

const deleteDevice = (req, res) => {
    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            _.remove(g.devices, (d) => d.id == req.device.id);

            return false;
        }
    });

    res.status(204).end();
};

module.exports = {
    getDevices,
    addDevice,
    deleteDevice
};
