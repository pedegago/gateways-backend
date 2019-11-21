/**
 * Required modules.
 */
const { Router } = require("express");

/**
 * Required middlewares.
 */
const {
    validateDevice,
    getDeviceByParam,
    deviceLimit
} = require("../middlewares/deviceMiddlewares");
const {
    getDevices,
    addDevice,
    deleteDevice
} = require("../controllers/deviceController");

/**
 * Router variable.
 */
const router = Router();

/**
 * GET: /.
 * Returns all devices from specified gateway.
 */
router.get("/", getDevices);

/**
 * POST: /.
 * Insert new device into specified gateway.
 */
router.post("/", deviceLimit, validateDevice, addDevice);

/**
 * DELETE: /{id}.
 * Deletes device from specified gateway.
 */
router.delete("/:id", getDeviceByParam, deleteDevice);

/**
 * Exporting router.
 */
module.exports = router;
