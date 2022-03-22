const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const path = require("path");
const { boot } = require("../src/boot");
const { readJsonFile } = require("./utils");

const expect = chai.expect;

chai.use(chaiHttp)

describe("Routes test suites", ()=>{
    let app;

    before(async()=>{
        app = boot();

        app.listen(3000);
    });

    it("should return hello world", async ()=>{
        const result = await chai.request(app).get("/");
        expect(result).status(200);
        expect(result.body).to.equal("hello world");
    });

    it("should write to file", async ()=>{
        const stub = {a: 1, b: 2, filename: "test.json"};

        const result = await chai.request(app).post("/").send(stub);
        expect(result).status(201);
        
        const dataFromFile = readJsonFile(path.resolve(__dirname, "../test.json"))

        Object.keys(dataFromFile).forEach((k)=>{
            expect(dataFromFile).to.have.property(k);
            expect(dataFromFile[k]).to.equal(stub[k]);
        })
    });
})