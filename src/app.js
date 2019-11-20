const PORT = process.env.PORT || 3000;

const express = require("express");
const gatewayRoutes = require("./routes/gatewayRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const { getGatewayByParam } = require("./middlewares/gatewayMiddlewares");

const app = express();

app.set("port", PORT);

app.use(express.json());

app.use("/api/gateways", gatewayRoutes);
app.use("/api/gateways/:serial/devices", getGatewayByParam, deviceRoutes);

// Basic security action.
app.disable('x-powered-by');

app.listen(
    app.get("port"),
    () => {
        console.info("✅  Server started on port", app.get("port"));
    }
);
