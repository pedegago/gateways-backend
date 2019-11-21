/**
 * Required modules.
 */
const { Router } = require("express");

/**
 * Required middlewares.
 */
const {
    validateGateway,
    getGatewayByParam
} = require("../middlewares/gatewayMiddlewares");
const {
    getAllGateways,
    addGateway,
    getGateway,
    updateGateway,
    deleteGateway
} = require("../controllers/gatewayController");

/**
 * Router variable.
 */
const router = Router();

/**
 * GET: /.
 * Returns all gateways and their devices.
 */
router.get("/", getAllGateways);

/**
 * GET: /.
 * Returns all gateways and their devices.
 */
router.post("/", validateGateway, addGateway);

/**
 * GET: /{serial}.
 * Returns specified gateway with no devices.
 * Devices are availables vía:
 * GET /api/gateways/{serial}/devices.
 */
router.get("/:serial", getGatewayByParam, getGateway);

/**
 * PUT: /{serial}.
 * Updates specified gateway.
 */
router.put("/:serial", getGatewayByParam, validateGateway, updateGateway);

/**
 * DELETE: /{serial}.
 * Deletes gateway.
 */
router.delete("/:serial", getGatewayByParam, deleteGateway);

/**
 * Exporting router.
 */
module.exports = router;
