const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const server = require('../server');
const Product = require('../models/product');
const Store = require('../models/store');

chai.should();
chai.use(chaiHttp);

const agent = chai.request.agent(server);

const SAMPLE_PRODUCT_ID = "aaaaaaaaaaaa";
const SAMPLE_STORE_ID = "bbbbbbbbbbbb";


const newProduct = {
    
}

const newStore = {
    
}

after(function(done){
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
})

describe('Products', function() {

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
            "store_id": SAMPLE_STORE_ID
        })

        Promise.all(sampleStore.save(), sampleProduct.save()).then(() => {done()}).catch(err => {done(err)});
    })

    afterEach(function(done) {
        Product.findOneAndDelete(newProduct)
        .then(function(product) {
            done();
        })
        .catch(function(err) {
            done(err);
        })
    })

    after(function(done) {
        Store.findByIdAndDelete(SAMPLE_STORE_ID).then(function(store){
            done()
        }).catch(function(err){
            done(err);
        })
    })

    it("Should return product by id", function(done) {
        chai.request(server).get(`/products/${SAMPLE_PRODUCT_ID}`)
        .then(function(res){
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.name).to.equal("lisen phone charger");
            done();
        })
    })

    it("Should should show all products", function(done){
        chai.request(server).get()
    })

    it("Should upload a new product", function(done) {
        Product.estimatedDocumentCount()
        .then(function(initialDocCount) {
            chai.request(server).post('/products').set("content-type", "application/x-www-form-urlencoded").send(newProduct)
            .then(function(res) {
                Product.estimatedDocumentCount()
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

