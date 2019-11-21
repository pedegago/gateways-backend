/**
 * Required modules.
 */
const express = require("express");
const gatewayRoutes = require("./routes/gatewayRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const { getGatewayByParam } = require("./middlewares/gatewayMiddlewares");

/**
 * App variables.
 * The PORT variable defines the server port.
 */
const app = express();
const PORT = process.env.PORT || 3000;

/**
 * App configuration with basic security
 * actions
 */
app.set("port", PORT);
app.use(express.json());
app.disable('x-powered-by');

/**
 * Routes definitions for gateways
 * and devices.
 */
app.use("/api/gateways", gatewayRoutes);
app.use("/api/gateways/:serial/devices", getGatewayByParam, deviceRoutes);

/**
 * Server activation.
 */
app.listen(
    app.get("port"),
    () => {
        console.info("✅  Server started on port", app.get("port"));
    }
);
