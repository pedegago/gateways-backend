/**
 * Required modules.
 */
const chai = require("chai");
const { expect } = require("chai");
const chaiHttp = require("chai-http");

/**
 * Initial gateway object.
 */
const gateway = {
    serial: "GG-TEST",
    name: "Testing gateways",
    ipv4: "127.0.0.1"
};

/**
 * Test configuration and variables.
 */
chai.use(chaiHttp);
const agent = chai.request("http://localhost:3000/api/gateways");

/**
 * Tests set. Each 'it' setence defines a
 * specific test.
 */
describe("Basic management of gateways", () => {
    it("GET: Recieve an array of gateways", (done) => {
        agent
            .get("/")
            .end((err, res) => {
                expect(res).to.have.status(200);

                expect(res.body).to.be.an("array");

                done();
            });
    });

    it("POST: Insert gateway successfully", (done) => {
        agent
            .post("/")
            .send(gateway)
            .end((err, res) => {
                expect(res).to.have.status(201);

                done();
            });
    });

    it("POST: Error inserting gateway with same serial", (done) => {
        agent
            .post("/")
            .send(gateway)
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it("GET: Recieve specific gateway", (done) => {
        agent
            .get(`/${gateway.serial}`)
            .end((err, res) => {
                expect(res).to.have.status(200);

                expect(res.body).to.be.an("object");

                done();
            });
    });

    it("GET: Error fetching non-existent gateway", (done) => {
        agent
            .get("/NON-EXISTENT")
            .end((err, res) => {
                expect(res).to.have.status(404);

                done();
            });
    });

    it("PUT: Updating specific gateway successfully", (done) => {
        agent
            .put(`/${gateway.serial}`)
            .send({
                ...gateway,
                name: "Some other name"
            })
            .end((err, res) => {
                expect(res).to.have.status(200);

                done();
            });
    });

    it("PUT: Validation error updating specific gateway", (done) => {
        agent
            .put(`/${gateway.serial}`)
            .send({
                ...gateway,
                ipv4: "This is not an Ipv4"
            })
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it("DELETE: Delete specific gateway", (done) => {
        agent
            .delete(`/${gateway.serial}`)
            .end((err, res) => {
                expect(res).to.have.status(204);

                done();
            });
    });
});
