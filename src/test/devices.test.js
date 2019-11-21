/**
 * Required modules.
 */
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

/**
 * Initial gateway and device objects.
 */
const gateway = {
    serial: "GD-TEST",
    name: "Testing devices",
    ipv4: "127.0.0.1"
};

const device = {
    vendor: "Cisco",
    isOnline: false
};

/**
 * Test configuration and variables.
 */
chai.use(chaiHttp);
const url = "http://localhost:3000/api/gateways";
const agent = chai.request(`${url}/${gateway.serial}/devices`);

/**
 * Tests set. Each 'it' setence defines a
 * specific test.
 */
describe("Basic management of devices from specific gateway", () => {
    // Cleans and inserts a gateway in order to
    // perform the test successfully.
    before(async () => {
        await chai.request(url)
            .delete(`/${gateway.serial}`)

        await chai.request(url)
            .post("/")
            .send(gateway);
    });

    it("GET: Recieve an array of devices", (done) => {
        agent
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);

                expect(res.body).to.be.an("array");

                done();
            });
    });

    it("POST: Insert device into gateway successfully", (done) => {
        agent
            .post("/")
            .send(device)
            .end((err, res) => {
                expect(res).to.have.status(201);

                done();
            });
    });

    it("POST: Error inserting device with no vendor", (done) => {
        agent
            .post("/")
            .send({
                ...device,
                vendor: ""
            })
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it("DELETE: Delete specific device from gateway", (done) => {
        agent
            .delete("/1")
            .end((err, res) => {
                expect(res).to.have.status(204);

                done();
            });
    });
});
