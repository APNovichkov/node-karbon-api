const chai = require("chai");
const chaiHttp = require("chai-http");
const mongoose = require('mongoose')

const server = require('../server');
const Product = require('../models/product');
const Store = require('../models/store');

const expect = chai.expect;
const should = chai.should()
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const SAMPLE_PRODUCT_ID = "aaaaaaaaaaaa";
const SAMPLE_STORE_ID = "bbbbbbbbbbba";
const SAMPLE_STORE_ID_2 = 'cccccccccccc';


after(function(done){
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
})

describe('Store', function() {
    beforeEach(function(done) {
        const sampleStore = new Store({
            "name": "Ankeney",
            "coordinates": "24.2222",
            "city": "San Francisco",
            "_id": SAMPLE_STORE_ID
        })

        const sampleProduct = new Product({
            "_id": SAMPLE_PRODUCT_ID,
            "name": "lisen phone charger",
            "category": "tech",
            "price": 20.99,
            "store": SAMPLE_STORE_ID
        })

        Promise.all([sampleStore.save(), sampleProduct.save()]).then(() => {done()}).catch(err => {done(err)});
    })

    afterEach(function(done) {
        const deleteProduct = Product.deleteMany({ name: ["lisen phone charger", "another product"] });
        const deleteStore = Store.deleteMany({ name: ["Ankeney", "Walgreens"] })

        Promise.all([deleteProduct, deleteStore])
        .then(function() {
            done();
        })
        .catch(function(err) {
            done(err);
        })
    })


    it("Should should show all stores", function(done){
        chai.request(server).get('/stores')
        .then(function(res){
            expect(res).to.have.status(200);
            // TODO check for product array
            done();
        }).catch(function(err){
            done(err);
        })
    })

    it("Should return store by id", function(done) {
        chai.request(server).get(`/stores/${SAMPLE_STORE_ID}`)
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.name).to.equal("Ankeney");
            done();
        }).catch(function(err) {
            done(err);
        })
    })

    

    it("Should upload a new store", function(done) {
        const newStore = {
            "_id": SAMPLE_STORE_ID_2,
            "name": "Walgreens",
            "coordinates": "23.4132",
            "city": "San Francisco"
        }

        Store.estimatedDocumentCount()
        .then(function(initialDocCount) {
            chai.request(server).post('/stores').set("content-type", "application/x-www-form-urlencoded").send(newStore)
            .then(function(res) {
                Store.estimatedDocumentCount()
                .then(function(newDocCount) {
                    expect(res).to.have.status(200);
                    expect(newDocCount).to.be.equal(initialDocCount + 1);
                    done();
                }).catch(function(err){
                    done(err);
                })
            }).catch(function(err){
                done(err);
            })
        }).catch(function(err){
            done(err);
        })
    })
})