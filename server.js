'use strict';
/**************************************************************************************************
 * This sample demonstrates a few more advanced features of Swagger-Express-Middleware,
 * such as setting a few options, initializing the mock data store, and adding custom middleware logic.
 **************************************************************************************************/

// Set the DEBUG environment variable to enable debug output of Swagger Middleware AND Swagger Parser
process.env.DEBUG = 'swagger:*';

var util            = require('util'),
    path            = require('path'),
    express         = require('express'),
    swagger         = require('swagger-express-middleware'),
    uuid            = require('uuid'),
    faker           = require('faker'),
    Middleware      = swagger.Middleware,
    MemoryDataStore = swagger.MemoryDataStore,
    FileDataStore   = swagger.FileDataStore,
    Resource        = swagger.Resource,
    _dataset         = require("./dataset.js");


var app = express();
var middleware = new Middleware(app);

middleware.init('tags.yaml', function(err) {
    // Create a custom data store with some initial mock data
    var myDB = new MemoryDataStore();
    // var myDB = new FileDataStore('cache');
    // myDB.save(
    //     new Resource('/tags/1', {id: 1, name: faker.lorem.sentence(1,3), created: faker.date.past(), lastUpdated: faker.date.past(), resources: [uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1()]}),
    //     new Resource('/tags/2', {id: 2, name: faker.lorem.sentence(1,3), created: faker.date.past(), lastUpdated: faker.date.past(), resources: [uuid.v1(), uuid.v1()]}),
    //     new Resource('/tags/3', {id: 3, name: faker.lorem.sentence(1,3), created: faker.date.past(), lastUpdated: faker.date.past(), resources: [uuid.v1()]}),
    //     new Resource('/tags/4', {id: 4, name: faker.lorem.sentence(1,3), created: faker.date.past(), lastUpdated: faker.date.past(), resources: [uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1()]}),
    //     new Resource('/tags/5', {id: 5, name: faker.lorem.sentence(1,3), created: faker.date.past(), lastUpdated: faker.date.past(), resources: [uuid.v1(), uuid.v1(), uuid.v1(), uuid.v1()]})
    // );

    myDB.save(_dataset.generate());

    myDB.getCollection('/tags/0/resources', function(err, resources) {
      console.log(resources);
    });

    app.use(
        middleware.metadata(),
        middleware.files(),
        middleware.CORS(),
        middleware.parseRequest(),
        middleware.validateRequest(),
        middleware.mock(myDB)
    );

    // Add custom middleware
    // app.patch('/tags/:tagId', function(req, res, next) {
    //     if (req.body.id !== req.params.tagId) {
    //         // The pet's name has changed, so change its URL.
    //         // Start by deleting the old resource
    //         myDB.delete(new Resource(req.path), function(err, pet) {
    //             if (pet) {
    //                 // Merge the new data with the old data
    //                 pet.merge(req.body);
    //             }
    //             else {
    //                 pet = req.body;
    //             }
    //
    //             // Save the pet with the new URL
    //             myDB.save(new Resource('/tags', req.body.id, pet), function(err, pet) {
    //                 // Send the response
    //                 res.json(pet.data);
    //             });
    //         });
    //     }
    //     else {
    //         next();
    //     }
    // });
    //
    // // The mock middleware will use our custom data store,
    // // which we already pre-populated with mock data
    // app.use(middleware.mock(myDB));

    // Add a custom error handler that returns errors as HTML
    app.use(function(err, req, res, next) {
        res.status(err.status);
        res.type('html');
        res.send(util.format('<html><body><h1>%d Error!</h1><p>%s</p></body></html>', err.status, err.message));
    });

    app.listen(8000, function() {
        console.log('The Agave Mock Tags API is now running at http://localhost:8000');
    });
});
