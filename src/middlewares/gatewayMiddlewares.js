const _ = require("lodash");
const { isIpv4 } = require("../utils/utils");
const gateways = require("../data/database");

const validateGateway = (req, res, next) => {
    const { serial, name, ipv4 } = req.body;
    const fields = {};

    let isValid = true;

    if (_.isEmpty(serial)) {
        fields.serial = "Gateway serial is required.";
        isValid = false;
    } else {
        const exist = _.find(gateways, (g) =>
            g.serial == serial
        );

        if (exist) {
            const method = req.method;

            if (method == "POST" || (method == "PUT" && serial != req.params.serial)) {
                fields.serial = "Gateway serial already exist.";
                isValid = false;
            }
        }
    }

    if (_.isEmpty(name)) {
        fields.name = "Gateway name is required.";
        isValid = false;
    }

    if (!isIpv4(ipv4)) {
        fields.ipv4 = "Invalid IPv4 format.";
        isValid = false;
    }

    if (!isValid) {
        res.status(400).json({
            message: "#400: Gateway validation error.",
            fields
        });

        return;
    }

    next();
};

const getGatewayByParam = (req, res, next) => {
    const gateway = _.find(
        gateways,
        (g) => g.serial == req.params.serial
    );

    if (!gateway) {
        res.status(404).json({
            message: "#404: Gateway not found."
        });

        return;
    }

    req.gateway = gateway;
    next();
};

module.exports = {
    validateGateway,
    getGatewayByParam
};
