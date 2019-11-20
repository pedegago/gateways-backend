const { Router } = require("express");
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

const router = Router();

router.get("/", getDevices);

router.post("/", deviceLimit, validateDevice, addDevice);

router.delete("/:id", getDeviceByParam, deleteDevice);

module.exports = router;
