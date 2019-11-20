const { Router } = require("express");
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

const router = Router();

router.get("/", getAllGateways);

router.post("/", validateGateway, addGateway);

router.get("/:serial", getGatewayByParam, getGateway);

router.put("/:serial", getGatewayByParam, validateGateway, updateGateway);

router.delete("/:serial", getGatewayByParam, deleteGateway);

module.exports = router;
