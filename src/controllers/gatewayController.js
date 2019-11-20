const _ = require("lodash");

let gateways = require("../data/database");

const getAllGateways = (req, res) => {
    res.json(gateways);
};

const addGateway = (req, res) => {
    const { serial, name, ipv4 } = req.body;

    gateways.push({
        serial,
        name,
        ipv4,
        devices: []
    });

    res.status(201).json({
        uri: `/api/gateways/${serial}`
    });
};

const getGateway = (req, res) => {
    res.json(
        _.omit(req.gateway, "devices")
    );
};

const updateGateway = (req, res) => {
    const { serial, name, ipv4 } = req.body;

    _.each(gateways, (g) => {
        if (g.serial == req.gateway.serial) {
            g.serial = serial;
            g.name = name;
            g.ipv4 = ipv4;

            return false;
        }
    });

    res.json({
        uri: `/api/gateways/${serial || req.gateway.serial}`
    });
};

const deleteGateway = (req, res) => {
    _.remove(gateways, (g) => g.serial == req.gateway.serial);

    res.status(204).end();
};

module.exports = {
    getAllGateways,
    addGateway,
    getGateway,
    updateGateway,
    deleteGateway
};
